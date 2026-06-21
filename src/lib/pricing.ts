// SaaS Pricing & Cost calculation engine.
// All base costs are computed in USD, then converted to the selected currency.

export type CurrencyCode = "USD" | "INR" | "EUR";

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  label: string;
  rate: number; // multiplier from USD
}

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: "USD", symbol: "$", label: "USD", rate: 1 },
  INR: { code: "INR", symbol: "₹", label: "INR", rate: 83 },
  EUR: { code: "EUR", symbol: "€", label: "EUR", rate: 0.92 },
};

export interface CalculatorInputs {
  mau: number; // monthly active users
  apiRequests: number; // per month
  emails: number; // per month
  sms: number; // OTPs per month
  storageGb: number;
  teamMembers: number;
  revenue: number; // expected monthly revenue (USD base)
}

export const DEFAULT_INPUTS: CalculatorInputs = {
  mau: 5000,
  apiRequests: 2_000_000,
  emails: 40_000,
  sms: 8000,
  storageGb: 250,
  teamMembers: 5,
  revenue: 12000,
};

export interface CostLine {
  key: string;
  label: string;
  group: "Infrastructure" | "Services";
  amount: number; // USD
  detail: string;
}

export interface CostResult {
  lines: CostLine[];
  infrastructure: number;
  services: number;
  monthly: number;
  annual: number;
  costPerUser: number;
  grossMargin: number; // percentage
  profit: number;
  breakEvenUsers: number;
  healthScore: number;
  revenue: number;
}

const M = 1_000_000;

export function computeCosts(i: CalculatorInputs): CostResult {
  const requestsM = i.apiRequests / M;

  // --- Infrastructure ---
  const hosting = 20 + requestsM * 2.2 + i.mau * 0.002;
  const database = 25 + i.mau * 0.0035 + i.storageGb * 0.04;
  const storage = i.storageGb * 0.023;
  const cdn = requestsM * 0.85 + i.storageGb * 0.012;

  // --- Services ---
  const email = Math.max(0, i.emails - 3000) * 0.0009 + (i.emails > 0 ? 1 : 0);
  const sms = i.sms * 0.0079;
  const payments = i.revenue * 0.02; // Razorpay ~2%
  const analytics = i.mau > 10000 ? 49 : i.mau > 1000 ? 19 : 0;
  const monitoring = 9 + requestsM * 0.35 + i.teamMembers * 4;

  const lines: CostLine[] = [
    { key: "hosting", label: "Hosting (Vercel/AWS)", group: "Infrastructure", amount: hosting, detail: "Compute & edge functions" },
    { key: "database", label: "Database (Supabase/Postgres)", group: "Infrastructure", amount: database, detail: "Managed Postgres + auth" },
    { key: "storage", label: "Object Storage", group: "Infrastructure", amount: storage, detail: "Files, backups & assets" },
    { key: "cdn", label: "CDN & Bandwidth", group: "Infrastructure", amount: cdn, detail: "Global content delivery" },
    { key: "email", label: "Email (Resend)", group: "Services", amount: email, detail: "Transactional email" },
    { key: "sms", label: "SMS / OTP (Twilio · 2Factor)", group: "Services", amount: sms, detail: "Auth & notifications" },
    { key: "payments", label: "Payments (Razorpay)", group: "Services", amount: payments, detail: "~2% processing" },
    { key: "analytics", label: "Analytics", group: "Services", amount: analytics, detail: "Product analytics" },
    { key: "monitoring", label: "Monitoring & Logs", group: "Services", amount: monitoring, detail: "Errors, uptime, traces" },
  ];

  const infrastructure = hosting + database + storage + cdn;
  const services = email + sms + payments + analytics + monitoring;
  const monthly = infrastructure + services;
  const annual = monthly * 12;
  const costPerUser = i.mau > 0 ? monthly / i.mau : 0;
  const profit = i.revenue - monthly;
  const grossMargin = i.revenue > 0 ? (profit / i.revenue) * 100 : 0;

  const arpu = i.mau > 0 ? i.revenue / i.mau : 0;
  const marginalPerUser = costPerUser;
  const breakEvenUsers =
    arpu - marginalPerUser > 0 ? Math.ceil(monthly / Math.max(arpu - marginalPerUser, 0.0001)) : 0;

  const healthScore = computeHealthScore(grossMargin, arpu, costPerUser, i);

  return {
    lines,
    infrastructure,
    services,
    monthly,
    annual,
    costPerUser,
    grossMargin,
    profit,
    breakEvenUsers,
    healthScore,
    revenue: i.revenue,
  };
}

function computeHealthScore(
  margin: number,
  arpu: number,
  costPerUser: number,
  i: CalculatorInputs,
): number {
  let score = 0;
  // Margin (0-50)
  score += Math.max(0, Math.min(50, (margin / 80) * 50));
  // ARPU vs cost ratio (0-30)
  const ratio = costPerUser > 0 ? arpu / costPerUser : 10;
  score += Math.max(0, Math.min(30, (ratio / 6) * 30));
  // Scale / traction (0-20)
  score += Math.max(0, Math.min(20, (Math.log10(Math.max(i.mau, 1)) / 5) * 20));
  return Math.round(Math.max(0, Math.min(100, score)));
}

export interface PlanRec {
  name: string;
  price: number; // monthly USD per seat/account
  userLimit: string;
  features: string[];
  estCustomers: number;
  revenue: number;
  profit: number;
  margin: number;
  highlighted?: boolean;
}

export function recommendPlans(i: CalculatorInputs, cost: CostResult): PlanRec[] {
  const arpu = i.mau > 0 ? i.revenue / i.mau : 10;
  const base = Math.max(9, Math.round(arpu * 0.6));

  const tiers: Array<Omit<PlanRec, "revenue" | "profit" | "margin">> = [
    {
      name: "Starter",
      price: roundPrice(base),
      userLimit: "Up to 3 seats",
      estCustomers: Math.round(i.mau * 0.6),
      features: ["Core features", "Community support", "1 project", "Basic analytics"],
    },
    {
      name: "Growth",
      price: roundPrice(base * 2.6),
      userLimit: "Up to 15 seats",
      estCustomers: Math.round(i.mau * 0.3),
      highlighted: true,
      features: ["Everything in Starter", "Priority support", "Unlimited projects", "Advanced analytics", "API access"],
    },
    {
      name: "Business",
      price: roundPrice(base * 6),
      userLimit: "Unlimited seats",
      estCustomers: Math.round(i.mau * 0.1),
      features: ["Everything in Growth", "SSO & SAML", "Dedicated manager", "SLA & audit logs", "Custom integrations"],
    },
  ];

  // Allocate cost across plans proportional to customers
  const totalCustomers = tiers.reduce((s, t) => s + t.estCustomers, 0) || 1;

  return tiers.map((t) => {
    const revenue = t.price * t.estCustomers;
    const allocatedCost = (cost.monthly * t.estCustomers) / totalCustomers;
    const profit = revenue - allocatedCost;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    return { ...t, revenue, profit, margin };
  });
}

function roundPrice(n: number): number {
  if (n < 20) return Math.max(9, Math.round(n));
  if (n < 100) return Math.round(n / 5) * 5 - 1;
  return Math.round(n / 10) * 10 - 1;
}

// Industry benchmarks for comparison
export const BENCHMARKS = [
  { label: "Top SaaS gross margin", value: "75–85%", metric: "margin" },
  { label: "Healthy SaaS margin", value: "70%+", metric: "margin" },
  { label: "Typical LTV:CAC", value: "3:1", metric: "ratio" },
  { label: "Median ARPU (SMB SaaS)", value: "$30–60", metric: "arpu" },
];

export function convert(usd: number, currency: Currency): number {
  return usd * currency.rate;
}

export function formatMoney(usd: number, currency: Currency, opts?: { decimals?: number }): string {
  const value = convert(usd, currency);
  const decimals = opts?.decimals ?? (Math.abs(value) < 10 && value !== 0 ? 2 : 0);
  return (
    currency.symbol +
    value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K";
  return n.toLocaleString("en-US");
}

// AI-style heuristic pricing suggestions (deterministic, no network)
export function pricingSuggestions(i: CalculatorInputs, cost: CostResult): string[] {
  const out: string[] = [];
  if (cost.grossMargin < 60) {
    out.push(
      `Your gross margin is ${cost.grossMargin.toFixed(0)}%. Consider raising prices ~${Math.ceil((65 - cost.grossMargin))}% or moving SMS/email-heavy usage to paid tiers to reach a 70%+ healthy margin.`,
    );
  } else {
    out.push(
      `Strong ${cost.grossMargin.toFixed(0)}% gross margin — you have room to invest in growth or add a usage-based add-on for power users.`,
    );
  }
  const arpu = i.mau > 0 ? i.revenue / i.mau : 0;
  if (arpu < cost.costPerUser * 3) {
    out.push(
      `ARPU is only ${(arpu / Math.max(cost.costPerUser, 0.0001)).toFixed(1)}× your cost-per-user. Introduce a higher Business tier to lift blended ARPU.`,
    );
  } else {
    out.push(`Your ARPU comfortably covers per-user costs — a free trial would lower acquisition friction.`);
  }
  if (i.sms > 5000) {
    out.push(`SMS is a major variable cost. Default to email/WhatsApp OTP and reserve SMS for high-value actions.`);
  }
  if (cost.breakEvenUsers > 0) {
    out.push(`You break even at roughly ${formatNumber(cost.breakEvenUsers)} paying users at current pricing.`);
  }
  return out;
}
