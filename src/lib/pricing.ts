// SaaS Pricing & Cost calculation engine.
// All base costs are computed in USD, then converted to the selected currency.

export type CurrencyCode =
  "USD" | "EUR" | "GBP" | "INR" | "CAD" | "AUD" | "SGD" | "JPY" | "CHF" | "AED" | "BRL" | "ZAR";
export type TargetMarket = "Developer" | "SMB" | "Mid-Market" | "Enterprise";
export type CloudProvider =
  "vercel-supabase" | "aws" | "gcp" | "azure" | "neon-railway" | "cloudflare-r2";

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  label: string;
  rate: number; // multiplier from USD
  name: string;
  country: string;
}

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: {
    code: "USD",
    symbol: "$",
    label: "USD",
    rate: 1,
    name: "US Dollar",
    country: "United States",
  },
  EUR: { code: "EUR", symbol: "€", label: "EUR", rate: 0.92, name: "Euro", country: "Eurozone" },
  GBP: {
    code: "GBP",
    symbol: "£",
    label: "GBP",
    rate: 0.79,
    name: "British Pound",
    country: "United Kingdom",
  },
  INR: { code: "INR", symbol: "₹", label: "INR", rate: 83, name: "Indian Rupee", country: "India" },
  CAD: {
    code: "CAD",
    symbol: "C$",
    label: "CAD",
    rate: 1.37,
    name: "Canadian Dollar",
    country: "Canada",
  },
  AUD: {
    code: "AUD",
    symbol: "A$",
    label: "AUD",
    rate: 1.51,
    name: "Australian Dollar",
    country: "Australia",
  },
  SGD: {
    code: "SGD",
    symbol: "S$",
    label: "SGD",
    rate: 1.35,
    name: "Singapore Dollar",
    country: "Singapore",
  },
  JPY: {
    code: "JPY",
    symbol: "¥",
    label: "JPY",
    rate: 158,
    name: "Japanese Yen",
    country: "Japan",
  },
  CHF: {
    code: "CHF",
    symbol: "CHF",
    label: "CHF",
    rate: 0.89,
    name: "Swiss Franc",
    country: "Switzerland",
  },
  AED: {
    code: "AED",
    symbol: "AED",
    label: "AED",
    rate: 3.67,
    name: "UAE Dirham",
    country: "United Arab Emirates",
  },
  BRL: {
    code: "BRL",
    symbol: "R$",
    label: "BRL",
    rate: 5.45,
    name: "Brazilian Real",
    country: "Brazil",
  },
  ZAR: {
    code: "ZAR",
    symbol: "R",
    label: "ZAR",
    rate: 18.2,
    name: "South African Rand",
    country: "South Africa",
  },
};

export interface CalculatorInputs {
  // Volume Drivers
  mau: number; // monthly active users
  payingCustomers: number;
  apiRequests: number; // per month
  emails: number; // per month
  sms: number; // OTPs per month
  storageGb: number;

  // Finance & Team
  teamMembers: number;
  avgSalary: number; // average monthly salary per member (USD)
  startingCash: number; // cash in bank (USD)
  monthlyMarketing: number; // marketing / sales spend (USD)

  // Unit Economics
  arpu: number; // Average Revenue Per User (USD)
  churnRate: number; // Monthly churn percentage (0 - 100)
  cac: number; // Customer Acquisition Cost (USD)
  annualBillingAdoption: number; // % of users on annual billing (0 - 100)

  // Customization
  targetMarket: TargetMarket;
  targetMargin: number; // e.g. 80
  cloudProvider: CloudProvider;
}

export const TEMPLATES: Record<
  string,
  { label: string; description: string; inputs: CalculatorInputs }
> = {
  aiSaaS: {
    label: "AI SaaS",
    description: "High API traffic, GPU/LLM hosting, file storage, and mid-range pricing.",
    inputs: {
      mau: 25000,
      payingCustomers: 850,
      apiRequests: 12_000_000,
      emails: 80_000,
      sms: 5000,
      storageGb: 800,
      teamMembers: 5,
      avgSalary: 7500,
      startingCash: 250_000,
      monthlyMarketing: 8000,
      arpu: 49,
      churnRate: 4.5,
      cac: 120,
      annualBillingAdoption: 25,
      targetMarket: "SMB",
      targetMargin: 80,
      cloudProvider: "vercel-supabase",
    },
  },
  devTools: {
    label: "Developer Tools",
    description: "Massive API traffic, lightweight storage, and developer-oriented pricing.",
    inputs: {
      mau: 40000,
      payingCustomers: 600,
      apiRequests: 35_000_000,
      emails: 50_000,
      sms: 1000,
      storageGb: 300,
      teamMembers: 3,
      avgSalary: 8500,
      startingCash: 180_000,
      monthlyMarketing: 4000,
      arpu: 29,
      churnRate: 3.0,
      cac: 90,
      annualBillingAdoption: 40,
      targetMarket: "Developer",
      targetMargin: 85,
      cloudProvider: "cloudflare-r2",
    },
  },
  b2bSaaS: {
    label: "B2B CRM / SaaS",
    description: "Medium volume, high ARPU, team accounts, focus on high margins.",
    inputs: {
      mau: 8000,
      payingCustomers: 400,
      apiRequests: 4_000_000,
      emails: 120_000,
      sms: 8000,
      storageGb: 1200,
      teamMembers: 6,
      avgSalary: 8000,
      startingCash: 400_000,
      monthlyMarketing: 15000,
      arpu: 120,
      churnRate: 2.0,
      cac: 350,
      annualBillingAdoption: 30,
      targetMarket: "Mid-Market",
      targetMargin: 85,
      cloudProvider: "aws",
    },
  },
  finTech: {
    label: "FinTech Platform",
    description: "High compliance database, payment/SMS heavy, enterprise security.",
    inputs: {
      mau: 15000,
      payingCustomers: 1200,
      apiRequests: 8_000_000,
      emails: 200_000,
      sms: 25000,
      storageGb: 1500,
      teamMembers: 8,
      avgSalary: 9000,
      startingCash: 600_000,
      monthlyMarketing: 25000,
      arpu: 75,
      churnRate: 2.5,
      cac: 220,
      annualBillingAdoption: 15,
      targetMarket: "SMB",
      targetMargin: 75,
      cloudProvider: "azure",
    },
  },
  marketplace: {
    label: "Marketplace & Commerce",
    description: "High transaction volume, heavy transactional emails, low SaaS fee.",
    inputs: {
      mau: 50000,
      payingCustomers: 3000,
      apiRequests: 15_000_000,
      emails: 450_000,
      sms: 15000,
      storageGb: 500,
      teamMembers: 4,
      avgSalary: 7000,
      startingCash: 150_000,
      monthlyMarketing: 12000,
      arpu: 15,
      churnRate: 6.0,
      cac: 40,
      annualBillingAdoption: 10,
      targetMarket: "SMB",
      targetMargin: 60,
      cloudProvider: "neon-railway",
    },
  },
};

export const DEFAULT_INPUTS: CalculatorInputs = TEMPLATES.aiSaaS.inputs;

export interface CostLine {
  key: string;
  label: string;
  group: "Infrastructure" | "Services" | "Operational";
  amount: number; // USD
  detail: string;
}

export interface ProviderCost {
  name: string;
  key: CloudProvider;
  hosting: number;
  database: number;
  storage: number;
  cdn: number;
  total: number;
}

export interface SaaSMetrics {
  mrr: number;
  arr: number;
  arpu: number;
  ltv: number;
  cac: number;
  ltvToCac: number;
  churnRate: number;
  paybackPeriod: number;
  ruleOf40: number;
  magicNumber: number;
}

export interface BenchmarkGrade {
  metric: string;
  label: string;
  value: string;
  percentile: number;
  grade: "A+" | "A" | "B" | "C" | "D" | "F";
  feedback: string;
}

export interface CostResult {
  lines: CostLine[];
  infrastructure: number;
  services: number;
  operational: number;
  monthlyExpenses: number;
  annualExpenses: number;
  costPerUser: number;
  costPerPayingCustomer: number;
  grossMargin: number; // percentage
  netMargin: number; // percentage
  netProfit: number;
  breakEvenUsers: number;
  healthScore: number;
  revenue: number;
  runwayMonths: number;
  burnRate: number; // net monthly outflow
  metrics: SaaSMetrics;
  providers: ProviderCost[];
  benchmarks: BenchmarkGrade[];
}

const M = 1_000_000;

export function computeCosts(i: CalculatorInputs): CostResult {
  const requestsM = i.apiRequests / M;

  // Calculate Provider Specific Costs
  const providers: ProviderCost[] = [
    {
      name: "Supabase & Vercel",
      key: "vercel-supabase" as CloudProvider,
      hosting: 20 + requestsM * 2.2 + i.mau * 0.002,
      database: 25 + i.mau * 0.0035 + i.storageGb * 0.04,
      storage: i.storageGb * 0.023,
      cdn: requestsM * 0.85 + i.storageGb * 0.012,
      total: 0,
    },
    {
      name: "Amazon Web Services (AWS)",
      key: "aws" as CloudProvider,
      hosting: 40 + requestsM * 3.5 + i.mau * 0.005,
      database: 50 + i.mau * 0.002 + i.storageGb * 0.15,
      storage: i.storageGb * 0.025,
      cdn: requestsM * 1.2 + i.storageGb * 0.08,
      total: 0,
    },
    {
      name: "Google Cloud Platform",
      key: "gcp" as CloudProvider,
      hosting: 45 + requestsM * 3.8 + i.mau * 0.006,
      database: 55 + i.mau * 0.002 + i.storageGb * 0.18,
      storage: i.storageGb * 0.026,
      cdn: requestsM * 1.3 + i.storageGb * 0.085,
      total: 0,
    },
    {
      name: "Microsoft Azure",
      key: "azure" as CloudProvider,
      hosting: 42 + requestsM * 3.7 + i.mau * 0.005,
      database: 48 + i.mau * 0.002 + i.storageGb * 0.16,
      storage: i.storageGb * 0.024,
      cdn: requestsM * 1.25 + i.storageGb * 0.082,
      total: 0,
    },
    {
      name: "Neon & Railway",
      key: "neon-railway" as CloudProvider,
      hosting: 15 + requestsM * 2.0 + i.mau * 0.001,
      database: 15 + i.mau * 0.003 + i.storageGb * 0.035,
      storage: i.storageGb * 0.025,
      cdn: requestsM * 0.8 + i.storageGb * 0.01,
      total: 0,
    },
    {
      name: "Cloudflare & R2",
      key: "cloudflare-r2" as CloudProvider,
      hosting: 10 + requestsM * 0.5,
      database: 20 + i.storageGb * 0.05,
      storage: i.storageGb * 0.015,
      cdn: requestsM * 0.05,
      total: 0,
    },
  ].map((p) => {
    p.total = p.hosting + p.database + p.storage + p.cdn;
    return p;
  });

  // Fetch costs of active provider
  const activeProvider = providers.find((p) => p.key === i.cloudProvider) || providers[0];

  // --- Services ---
  const email = Math.max(0, i.emails - 3000) * 0.0009 + (i.emails > 0 ? 1 : 0);
  const sms = i.sms * 0.0079;
  const paymentRevenue = i.payingCustomers * i.arpu;
  const payments = paymentRevenue * 0.022 + i.payingCustomers * 0.3; // Stripe ~2.2% + 30c
  const analytics = i.mau > 10000 ? 79 : i.mau > 1000 ? 29 : 0;
  const monitoring = 15 + requestsM * 0.45 + i.teamMembers * 5;

  // --- Operational ---
  const payroll = i.teamMembers * i.avgSalary;
  const tools = 50 + i.teamMembers * 40; // Slack, Notion, Github
  const marketingSales = i.monthlyMarketing;

  const lines: CostLine[] = [
    {
      key: "hosting",
      label: `Hosting (${activeProvider.name})`,
      group: "Infrastructure",
      amount: activeProvider.hosting,
      detail: "Compute / edge services",
    },
    {
      key: "database",
      label: "Database System",
      group: "Infrastructure",
      amount: activeProvider.database,
      detail: "Structured data storage",
    },
    {
      key: "storage",
      label: "Object Storage",
      group: "Infrastructure",
      amount: activeProvider.storage,
      detail: "Files, backups & assets",
    },
    {
      key: "cdn",
      label: "CDN & Bandwidth",
      group: "Infrastructure",
      amount: activeProvider.cdn,
      detail: "Global assets delivery",
    },
    {
      key: "email",
      label: "Email (Resend/SendGrid)",
      group: "Services",
      amount: email,
      detail: "Transactional emails",
    },
    {
      key: "sms",
      label: "SMS Alerts (Twilio)",
      group: "Services",
      amount: sms,
      detail: "OTPs and authentication",
    },
    {
      key: "payments",
      label: "Payment Processor (Stripe)",
      group: "Services",
      amount: payments,
      detail: "Subscription processing fees",
    },
    {
      key: "analytics",
      label: "Product Analytics",
      group: "Services",
      amount: analytics,
      detail: "Mixpanel / PostHog metrics",
    },
    {
      key: "monitoring",
      label: "Uptime & Error Tracking",
      group: "Services",
      amount: monitoring,
      detail: "Sentry / Datadog agents",
    },
    {
      key: "payroll",
      label: "Team Payroll",
      group: "Operational",
      amount: payroll,
      detail: "Employee compensation",
    },
    {
      key: "tools",
      label: "SaaS Tools",
      group: "Operational",
      amount: tools,
      detail: "Slack, Notion, linear, etc.",
    },
    {
      key: "marketingSales",
      label: "Marketing & S&M",
      group: "Operational",
      amount: marketingSales,
      detail: "Ad spend & customer acquisition",
    },
  ];

  const infrastructure =
    activeProvider.hosting + activeProvider.database + activeProvider.storage + activeProvider.cdn;
  const services = email + sms + payments + analytics + monitoring;
  const operational = payroll + tools + marketingSales;

  const monthlyExpenses = infrastructure + services + operational;
  const annualExpenses = monthlyExpenses * 12;

  // Revenue math
  const monthlySaaSRevenue = paymentRevenue;
  const annualAdoptionMultiplier = 1 - (i.annualBillingAdoption / 100) * 0.15; // 15% discount for annual plans
  const discountedSaaSRevenue = monthlySaaSRevenue * annualAdoptionMultiplier;

  const costPerUser = i.mau > 0 ? (infrastructure + services) / i.mau : 0;
  const costPerPayingCustomer =
    i.payingCustomers > 0 ? (infrastructure + services) / i.payingCustomers : 0;

  // Gross Profit = Revenue - COGS (Infra + Services)
  const cogs = infrastructure + services;
  const grossProfit = discountedSaaSRevenue - cogs;
  const grossMargin = discountedSaaSRevenue > 0 ? (grossProfit / discountedSaaSRevenue) * 100 : 0;

  // Net Profit = Revenue - All Expenses
  const netProfit = discountedSaaSRevenue - monthlyExpenses;
  const netMargin = discountedSaaSRevenue > 0 ? (netProfit / discountedSaaSRevenue) * 100 : 0;

  // Break-even paying customers
  const marginalCostPerCustomer = costPerPayingCustomer;
  const netCustomerContribution = i.arpu * annualAdoptionMultiplier - marginalCostPerCustomer;
  const breakEvenUsers =
    netCustomerContribution > 0 ? Math.ceil(monthlyExpenses / netCustomerContribution) : 0;

  // Churn & LTV
  const ltv =
    i.churnRate > 0 ? (i.arpu * annualAdoptionMultiplier) / (i.churnRate / 100) : i.arpu * 100;
  const ltvToCac = i.cac > 0 ? ltv / i.cac : 0;
  const paybackPeriod =
    i.arpu > 0 && ltvToCac > 0
      ? i.cac / Math.max(0.1, i.arpu * annualAdoptionMultiplier - marginalCostPerCustomer)
      : 0;

  // Growth rates (assumed for metrics)
  const growthRateYoY = 120; // 120% YoY growth rate
  const freeCashFlowMargin = netMargin;
  const ruleOf40 = growthRateYoY + freeCashFlowMargin;

  // SaaS Magic Number
  const netNewCustomersPerMonth = Math.max(
    0,
    i.payingCustomers * 0.12 - i.payingCustomers * (i.churnRate / 100),
  );
  const netNewARR = netNewCustomersPerMonth * i.arpu * 12;
  const magicNumber = marketingSales > 0 ? netNewARR / (marketingSales * 3) : 0; // marketing spend scaled to quarter

  const metrics: SaaSMetrics = {
    mrr: discountedSaaSRevenue,
    arr: discountedSaaSRevenue * 12,
    arpu: i.arpu * annualAdoptionMultiplier,
    ltv,
    cac: i.cac,
    ltvToCac,
    churnRate: i.churnRate,
    paybackPeriod,
    ruleOf40,
    magicNumber,
  };

  // Burn & Runway
  const burnRate = netProfit < 0 ? Math.abs(netProfit) : 0;
  const runwayMonths = burnRate > 0 ? i.startingCash / burnRate : netProfit >= 0 ? 999 : 0;

  // Grade Benchmarks
  const benchmarks = computeBenchmarks(
    grossMargin,
    ltvToCac,
    runwayMonths,
    i.churnRate,
    ruleOf40,
    activeProvider.total,
    i.mau,
  );

  // Health Score
  const healthScore = computeHealthScore(
    grossMargin,
    ltvToCac,
    runwayMonths,
    i.churnRate,
    ruleOf40,
  );

  return {
    lines,
    infrastructure,
    services,
    operational,
    monthlyExpenses,
    annualExpenses,
    costPerUser,
    costPerPayingCustomer,
    grossMargin,
    netMargin,
    netProfit,
    breakEvenUsers,
    healthScore,
    revenue: discountedSaaSRevenue,
    runwayMonths,
    burnRate,
    metrics,
    providers,
    benchmarks,
  };
}

function computeBenchmarks(
  grossMargin: number,
  ltvToCac: number,
  runway: number,
  churn: number,
  ruleOf40: number,
  infraCost: number,
  mau: number,
): BenchmarkGrade[] {
  const list: BenchmarkGrade[] = [];

  // Gross Margin
  let gmGrade: "A+" | "A" | "B" | "C" | "D" | "F" = "F";
  let gmP = 10;
  let gmF = "Margins are dangerously low. Host costs or fees cover most revenue.";
  if (grossMargin >= 85) {
    gmGrade = "A+";
    gmP = 98;
    gmF = "Elite. Outstanding infrastructure efficiency and high price leverage.";
  } else if (grossMargin >= 80) {
    gmGrade = "A";
    gmP = 90;
    gmF = "Great. In line with premium VC-backed SaaS businesses.";
  } else if (grossMargin >= 70) {
    gmGrade = "B";
    gmP = 75;
    gmF = "Healthy. Room to optimize hosting, database, or API queries.";
  } else if (grossMargin >= 60) {
    gmGrade = "C";
    gmP = 50;
    gmF = "Average. Infrastructure or processing charges are eating into margins.";
  } else if (grossMargin >= 40) {
    gmGrade = "D";
    gmP = 30;
    gmF = "Low. Review API workloads, hosting layers, and pricing levels.";
  }
  list.push({
    metric: "margin",
    label: "Gross Margin",
    value: `${grossMargin.toFixed(0)}%`,
    percentile: gmP,
    grade: gmGrade,
    feedback: gmF,
  });

  // LTV:CAC
  let lcGrade: "A+" | "A" | "B" | "C" | "D" | "F" = "F";
  let lcP = 10;
  let lcF = "Unsustainable unit economics. You spend too much to acquire low-value users.";
  if (ltvToCac >= 5) {
    lcGrade = "A+";
    lcP = 95;
    lcF = "Outstanding customer ROI. Marketing spends are highly profitable.";
  } else if (ltvToCac >= 4) {
    lcGrade = "A";
    lcP = 85;
    lcF = "Great unit economics. Solid ROI with scalable marketing channels.";
  } else if (ltvToCac >= 3) {
    lcGrade = "B";
    lcP = 70;
    lcF = "Healthy standard. CAC payback is reasonable.";
  } else if (ltvToCac >= 2) {
    lcGrade = "C";
    lcP = 45;
    lcF = "Mediocre. Churn reduction or ARPU expansion needed.";
  } else if (ltvToCac >= 1.5) {
    lcGrade = "D";
    lcP = 25;
    lcF = "Inefficient. High threat of losing cash on marketing.";
  }
  list.push({
    metric: "ltv_cac",
    label: "LTV:CAC Ratio",
    value: `${ltvToCac.toFixed(1)}x`,
    percentile: lcP,
    grade: lcGrade,
    feedback: lcF,
  });

  // Churn Rate
  let chGrade: "A+" | "A" | "B" | "C" | "D" | "F" = "F";
  let chP = 10;
  let chF = "Leaky bucket. You lose too many customers every month to sustain growth.";
  if (churn <= 1.5) {
    chGrade = "A+";
    chP = 96;
    chF = "Enterprise-grade retention. Customer satisfaction is incredibly high.";
  } else if (churn <= 3.0) {
    chGrade = "A";
    chP = 82;
    chF = "Strong retention. Normal for stable B2B products.";
  } else if (churn <= 5.0) {
    chGrade = "B";
    chP = 65;
    chF = "Healthy standard. Normal range for early stage startups.";
  } else if (churn <= 8.0) {
    chGrade = "C";
    chP = 40;
    chF = "Elevated. Focus on product onboarding and UX friction.";
  } else if (churn <= 12.0) {
    chGrade = "D";
    chP = 20;
    chF = "High churn. Investigate product value proposition.";
  }
  list.push({
    metric: "churn",
    label: "Monthly Churn",
    value: `${churn.toFixed(1)}%`,
    percentile: chP,
    grade: chGrade,
    feedback: chF,
  });

  // Runway
  let rwGrade: "A+" | "A" | "B" | "C" | "D" | "F" = "F";
  let rwP = 10;
  let rwF = "Immediate default risk. Runway is critically short.";
  if (runway >= 24) {
    rwGrade = "A+";
    rwP = 95;
    rwF = "Infinite or elite runway. Safe from market conditions.";
  } else if (runway >= 18) {
    rwGrade = "A";
    rwP = 85;
    rwF = "Excellent runway. Full flexibility to test new features.";
  } else if (runway >= 12) {
    rwGrade = "B";
    rwP = 70;
    rwF = "Healthy. Standard runway buffer to scale operations.";
  } else if (runway >= 6) {
    rwGrade = "C";
    rwP = 40;
    rwF = "Moderate risk. Fundraising or profitability focus recommended.";
  } else if (runway >= 3) {
    rwGrade = "D";
    rwP = 20;
    rwF = "High danger. Cut operational burn or trigger pricing increases.";
  }
  list.push({
    metric: "runway",
    label: "Cash Runway",
    value: runway === 999 ? "Profitable" : `${runway.toFixed(1)} mo`,
    percentile: rwP,
    grade: rwGrade,
    feedback: rwF,
  });

  // Rule of 40
  let r4Grade: "A+" | "A" | "B" | "C" | "D" | "F" = "F";
  let r4P = 10;
  let r4F = "Inefficient growth path. Spend exceeds business value generation.";
  if (ruleOf40 >= 50) {
    r4Grade = "A+";
    r4P = 97;
    r4F = "Venture darling. Extremely fast growth and/or exceptional margins.";
  } else if (ruleOf40 >= 40) {
    r4Grade = "A";
    r4P = 90;
    r4F = "Elite SaaS standard. Stellar health index.";
  } else if (ruleOf40 >= 30) {
    r4Grade = "B";
    r4P = 72;
    r4F = "Good stability. Healthy balance of growth and burn.";
  } else if (ruleOf40 >= 15) {
    r4Grade = "C";
    r4P = 48;
    r4F = "Moderate. Could benefit from tighter operational expense controls.";
  } else if (ruleOf40 >= 0) {
    r4Grade = "D";
    r4P = 25;
    r4F = "Weak score. Needs product pricing alignment.";
  }
  list.push({
    metric: "rule_40",
    label: "Rule of 40",
    value: `${ruleOf40.toFixed(0)}%`,
    percentile: r4P,
    grade: r4Grade,
    feedback: r4F,
  });

  // Infrastructure Efficiency
  const infraCostPerUser = mau > 0 ? infraCost / mau : 0;
  let ieGrade: "A+" | "A" | "B" | "C" | "D" | "F" = "F";
  let ieP = 10;
  let ieF = "High cloud overhead. Code base optimization or provider migration needed.";
  if (infraCostPerUser < 0.002) {
    ieGrade = "A+";
    ieP = 98;
    ieF = "Elite efficiency. Excellent serverless or edge architecture footprint.";
  } else if (infraCostPerUser < 0.01) {
    ieGrade = "A";
    ieP = 88;
    ieF = "Great caching and data access patterns.";
  } else if (infraCostPerUser < 0.05) {
    ieGrade = "B";
    ieP = 70;
    ieF = "Healthy standard. Normal database and compute workloads.";
  } else if (infraCostPerUser < 0.15) {
    ieGrade = "C";
    ieP = 45;
    ieF = "Average. Watch database queries and asset hosting.";
  } else if (infraCostPerUser < 0.5) {
    ieGrade = "D";
    ieP = 25;
    ieF = "High database cost or lack of static caching.";
  }
  list.push({
    metric: "infra",
    label: "Infra Efficiency",
    value: `$${infraCostPerUser.toFixed(3)}/usr`,
    percentile: ieP,
    grade: ieGrade,
    feedback: ieF,
  });

  return list;
}

function computeHealthScore(
  margin: number,
  ltvToCac: number,
  runway: number,
  churn: number,
  ruleOf40: number,
): number {
  let score = 0;
  // Margin (0-25)
  score += Math.max(0, Math.min(25, (margin / 85) * 25));
  // LTV:CAC (0-25)
  score += Math.max(0, Math.min(25, (ltvToCac / 4) * 25));
  // Churn (0-20)
  score += Math.max(0, Math.min(20, ((10 - Math.min(churn, 10)) / 10) * 20));
  // Runway (0-15)
  const runwayFactor = runway === 999 ? 15 : (Math.min(runway, 18) / 18) * 15;
  score += runwayFactor;
  // Rule of 40 (0-15)
  score += Math.max(0, Math.min(15, (ruleOf40 / 40) * 15));

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
  const userInfraCost = cost.costPerPayingCustomer || 0.5;

  let basePrice = 19;
  const features = {
    starter: ["Core access", "1 Admin seat", "Email support", "Basic analytics"],
    pro: [
      "Advanced features",
      "Up to 5 seats",
      "Priority email Support",
      "Dashboard reports",
      "API Key access",
    ],
    business: [
      "Full suite",
      "Up to 20 seats",
      "24/7 Slack support",
      "Team collaboration",
      "Role permissions",
      "Custom domain",
    ],
    enterprise: [
      "Unlimited scale",
      "Dedicated support manager",
      "Custom SLA contract",
      "SSO/SAML login",
      "Audit Logs",
      "Custom databases",
    ],
  };

  switch (i.targetMarket) {
    case "Developer":
      basePrice = Math.max(9, Math.round(userInfraCost * 3));
      break;
    case "SMB":
      basePrice = Math.max(29, Math.round(userInfraCost * 4.5));
      break;
    case "Mid-Market":
      basePrice = Math.max(99, Math.round(userInfraCost * 8));
      break;
    case "Enterprise":
      basePrice = Math.max(499, Math.round(userInfraCost * 20));
      break;
  }

  const starterPrice = roundPrice(basePrice);
  const proPrice = roundPrice(basePrice * 2.8);
  const businessPrice = roundPrice(basePrice * 7);
  const enterprisePrice = roundPrice(basePrice * 25);

  const tiers: PlanRec[] = [
    {
      name: "Starter",
      price: starterPrice,
      userLimit: "1 Seat",
      estCustomers: Math.round(i.payingCustomers * 0.5),
      features: features.starter,
      revenue: starterPrice * Math.round(i.payingCustomers * 0.5),
      profit: 0,
      margin: 0,
    },
    {
      name: "Pro",
      price: proPrice,
      userLimit: "5 Seats",
      estCustomers: Math.round(i.payingCustomers * 0.35),
      features: features.pro,
      revenue: proPrice * Math.round(i.payingCustomers * 0.35),
      profit: 0,
      margin: 0,
      highlighted: true,
    },
    {
      name: "Business",
      price: businessPrice,
      userLimit: "20 Seats",
      estCustomers: Math.round(i.payingCustomers * 0.12),
      features: features.business,
      revenue: businessPrice * Math.round(i.payingCustomers * 0.12),
      profit: 0,
      margin: 0,
    },
    {
      name: "Enterprise",
      price: enterprisePrice,
      userLimit: "Custom seats",
      estCustomers: Math.round(i.payingCustomers * 0.03),
      features: features.enterprise,
      revenue: enterprisePrice * Math.round(i.payingCustomers * 0.03),
      profit: 0,
      margin: 0,
    },
  ];

  const totalRev = tiers.reduce((acc, t) => acc + t.revenue, 0) || 1;
  return tiers.map((t) => {
    const revenueShare = t.revenue / totalRev;
    const allocatedCost = cost.monthlyExpenses * revenueShare;
    const profit = t.revenue - allocatedCost;
    const margin = t.revenue > 0 ? (profit / t.revenue) * 100 : 0;
    return { ...t, profit, margin };
  });
}

function roundPrice(n: number): number {
  if (n < 15) return Math.max(5, Math.round(n));
  if (n < 100) return Math.round(n / 5) * 5 - 1;
  if (n < 500) return Math.round(n / 10) * 10 - 1;
  return Math.round(n / 50) * 50 - 1;
}

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

// Advanced AI Advisor recommendations
export interface AdviceItem {
  id: string;
  category: "pricing" | "infra" | "runway" | "marketing" | "retention";
  title: string;
  advice: string;
  why: string;
  severity: "info" | "warning" | "error" | "success";
}

export function generateAdvice(i: CalculatorInputs, cost: CostResult): AdviceItem[] {
  const list: AdviceItem[] = [];

  // Gross Margin check
  if (cost.grossMargin < 70) {
    list.push({
      id: "gross-margin-issue",
      category: "pricing",
      title: "Unsustainable Infrastructure COGS Margin",
      advice: "Increase plan pricing by at least 25% or introduce usage quotas for API usage.",
      why: `Your Gross Margin is ${cost.grossMargin.toFixed(1)}%, which is below the healthy SaaS industry standard of 70%+. This is driven by high per-user hosting or API expenses relative to ARPU.`,
      severity: "error",
    });
  } else if (cost.grossMargin > 85) {
    list.push({
      id: "gross-margin-good",
      category: "pricing",
      title: "Exceptional Gross Margins",
      advice:
        "You have strong margin safety. You can aggressively run marketing promotions or build a free tier.",
      why: `Your Gross Margin is ${cost.grossMargin.toFixed(1)}%. This allows you to scale user traffic without worrying about infrastructure costs.`,
      severity: "success",
    });
  }

  // Churn check
  if (i.churnRate > 5) {
    list.push({
      id: "churn-leakage",
      category: "retention",
      title: "High Customer Churn Rate",
      advice: "Invest in user onboarding UX, and run surveys to discover why users drop off.",
      why: `A monthly churn rate of ${i.churnRate}% implies that the average customer stays only ${(100 / i.churnRate).toFixed(1)} months, forcing you to constantly acquire new users.`,
      severity: "error",
    });
  }

  // LTV:CAC check
  if (cost.metrics.ltvToCac < 3) {
    list.push({
      id: "ltv-cac-low",
      category: "marketing",
      title: "Inefficient CAC Payback",
      advice:
        "Optimize organic acquisition channels or raise pricing to increase customer lifetime value.",
      why: `Your LTV:CAC is ${cost.metrics.ltvToCac.toFixed(1)}x. A ratio below 3x means you are spending too much cash to acquire customers relative to their long-term value.`,
      severity: "warning",
    });
  }

  // Runway check
  if (cost.runwayMonths < 6 && cost.runwayMonths > 0) {
    list.push({
      id: "runway-danger",
      category: "runway",
      title: "Critical Cash Runway Limit",
      advice:
        "Reduce payroll headcounts, freeze marketing spend, or close an immediate funding round.",
      why: `Your runway is only ${cost.runwayMonths.toFixed(1)} months. You are burning money faster than you can recoup it.`,
      severity: "error",
    });
  } else if (cost.runwayMonths >= 18 || cost.runwayMonths === 999) {
    list.push({
      id: "runway-safe",
      category: "runway",
      title: "Capital Efficient Runway",
      advice:
        "Leverage your cash safety to recruit key engineering roles or run growth experiments.",
      why: `Your business has sufficient runway (${cost.runwayMonths === 999 ? "Profitable" : cost.runwayMonths.toFixed(0) + " months"}). This allows you to plan product development cycles longer term.`,
      severity: "success",
    });
  }

  // Cloud provider suggestions
  const bestProvider = [...cost.providers].sort((a, b) => a.total - b.total)[0];
  if (bestProvider.key !== i.cloudProvider && cost.infrastructure * 0.15 > 50) {
    const yearlySavings = (cost.infrastructure - bestProvider.total) * 12;
    list.push({
      id: "cloud-optimization",
      category: "infra",
      title: "Potential Cloud Cost Savings",
      advice: `Consider migrating your stack to ${bestProvider.name} to optimize database and serverless compute costs.`,
      why: `Switching to ${bestProvider.name} could save you roughly $${(cost.infrastructure - bestProvider.total).toFixed(0)} per month ($${yearlySavings.toFixed(0)}/yr) based on your current traffic volumes.`,
      severity: "info",
    });
  }

  // Cloudflare R2 storage optimization specific advice
  if (i.storageGb > 500 && i.cloudProvider !== "cloudflare-r2") {
    const s3StorageCost = i.storageGb * 0.023;
    const r2StorageCost = i.storageGb * 0.015;
    const storageSavings = (s3StorageCost - r2StorageCost) * 12;
    list.push({
      id: "cloudflare-r2-migration",
      category: "infra",
      title: "S3 to Cloudflare R2 Storage Migration",
      advice: "Migrate your media and static file assets storage from AWS S3 to Cloudflare R2.",
      why: `Cloudflare R2 charges zero egress fees and has a lower base rate of $0.015/GB compared to S3's $0.023/GB. This will save you an estimated $${storageSavings.toFixed(0)}/year.`,
      severity: "success",
    });
  }

  // Database optimization advice
  if (i.apiRequests > 10000000) {
    list.push({
      id: "db-read-replica",
      category: "infra",
      title: "Database Caching & Read Optimization",
      advice:
        "Introduce Redis (Upstash) or Postgres read replicas to handle massive read requests.",
      why: `With ${formatNumber(i.apiRequests)} monthly API requests, caching repetitive select operations will decrease database query loads by up to 60%, reducing server sizing requirements.`,
      severity: "warning",
    });
  }

  // Annual plans suggestion
  if (i.annualBillingAdoption < 20) {
    list.push({
      id: "annual-plan-adoption",
      category: "marketing",
      title: "Low Annual Plan Adoption",
      advice:
        "Offer a 2-month free discount (16.7% off) for users who upgrade to annual payment plans.",
      why: "Annual plans secure upfront cash, instantly eliminating cash flow friction and boosting your bank balances for immediate marketing campaigns.",
      severity: "info",
    });
  }

  return list;
}
