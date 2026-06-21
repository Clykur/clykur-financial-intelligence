import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Activity,
  Mail,
  MessageSquare,
  HardDrive,
  Copy,
  Download,
  Share2,
  TrendingUp,
  Sparkles,
  Gauge,
  Check,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { toast } from "sonner";
import { CalcSlider } from "./CalcSlider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CURRENCIES,
  type CurrencyCode,
  type CalculatorInputs,
  computeCosts,
  recommendPlans,
  formatMoney,
  formatNumber,
  pricingSuggestions,
  BENCHMARKS,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

const CHART_COLORS = [
  "oklch(0.705 0.19 43)",
  "oklch(0.78 0.16 55)",
  "oklch(0.72 0.17 155)",
  "oklch(0.66 0.16 255)",
  "oklch(0.78 0.16 90)",
  "oklch(0.7 0.18 320)",
  "oklch(0.65 0.14 200)",
  "oklch(0.6 0.2 25)",
  "oklch(0.62 0.12 130)",
];

interface Props {
  inputs: CalculatorInputs;
  setInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
  currencyCode: CurrencyCode;
  setCurrencyCode: (c: CurrencyCode) => void;
}

function StatCard({
  label,
  value,
  sub,
  accent,
  delay = 0,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "glass rounded-2xl p-5",
        accent && "glow-primary",
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={cn("mt-2 font-display text-2xl font-bold sm:text-3xl", accent && "text-gradient")}>
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}

export function Calculator({ inputs, setInputs, currencyCode, setCurrencyCode }: Props) {
  const currency = CURRENCIES[currencyCode];
  const cost = useMemo(() => computeCosts(inputs), [inputs]);
  const plans = useMemo(() => recommendPlans(inputs, cost), [inputs, cost]);
  const suggestions = useMemo(() => pricingSuggestions(inputs, cost), [inputs, cost]);

  const set = (k: keyof CalculatorInputs) => (v: number) =>
    setInputs((prev) => ({ ...prev, [k]: v }));

  const pieData = cost.lines
    .filter((l) => l.amount > 0)
    .map((l) => ({ name: l.label, value: Math.round(l.amount * currency.rate) }));

  const compareData = [
    {
      name: "Monthly",
      Revenue: Math.round(inputs.revenue * currency.rate),
      Cost: Math.round(cost.monthly * currency.rate),
      Profit: Math.round(cost.profit * currency.rate),
    },
  ];

  const growthData = Array.from({ length: 12 }, (_, m) => {
    const factor = Math.pow(1.12, m); // 12% MoM growth
    const rev = inputs.revenue * factor;
    const variable = (cost.services - inputs.revenue * 0.02) * factor + inputs.revenue * factor * 0.02;
    const fixed = cost.infrastructure * Math.pow(1.05, m);
    const c = variable + fixed;
    return {
      month: `M${m + 1}`,
      Revenue: Math.round(rev * currency.rate),
      Cost: Math.round(c * currency.rate),
    };
  });

  const copyResults = async () => {
    const text = [
      "SaaS Cost & Pricing Report — Clykur",
      "—".repeat(20),
      `Monthly cost: ${formatMoney(cost.monthly, currency)}`,
      `Annual cost: ${formatMoney(cost.annual, currency)}`,
      `Cost per user: ${formatMoney(cost.costPerUser, currency, { decimals: 2 })}`,
      `Gross margin: ${cost.grossMargin.toFixed(1)}%`,
      `Monthly profit: ${formatMoney(cost.profit, currency)}`,
      `Break-even: ${formatNumber(cost.breakEvenUsers)} users`,
      `SaaS health score: ${cost.healthScore}/100`,
      "",
      "Recommended plans:",
      ...plans.map((p) => `  ${p.name}: ${formatMoney(p.price, currency)}/mo — ${p.userLimit}`),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Results copied to clipboard");
    } catch {
      toast.error("Could not copy");
    }
  };

  const shareLink = async () => {
    const params = new URLSearchParams(
      Object.entries(inputs).reduce((a, [k, v]) => ({ ...a, [k]: String(v) }), {}),
    );
    params.set("cur", currencyCode);
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Shareable link copied");
    } catch {
      toast.error("Could not copy link");
    }
  };

  const downloadPdf = () => {
    toast.info("Preparing your report…");
    setTimeout(() => window.print(), 150);
  };

  return (
    <div className="space-y-8">
      {/* Inputs + headline results */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Inputs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-strong rounded-3xl p-6 lg:col-span-2"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Your inputs</h3>
            <div className="flex gap-1 rounded-lg bg-secondary p-1">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrencyCode(c)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors",
                    currencyCode === c
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <CalcSlider
              label="Monthly Active Users"
              icon={<Users className="h-4 w-4" />}
              value={inputs.mau}
              min={100}
              max={500000}
              step={100}
              onChange={set("mau")}
              display={formatNumber(inputs.mau)}
            />
            <CalcSlider
              label="API Requests / month"
              icon={<Activity className="h-4 w-4" />}
              value={inputs.apiRequests}
              min={10000}
              max={100_000_000}
              step={10000}
              onChange={set("apiRequests")}
              display={formatNumber(inputs.apiRequests)}
            />
            <CalcSlider
              label="Emails / month"
              icon={<Mail className="h-4 w-4" />}
              value={inputs.emails}
              min={0}
              max={2_000_000}
              step={1000}
              onChange={set("emails")}
              display={formatNumber(inputs.emails)}
            />
            <CalcSlider
              label="SMS OTPs / month"
              icon={<MessageSquare className="h-4 w-4" />}
              value={inputs.sms}
              min={0}
              max={500000}
              step={500}
              onChange={set("sms")}
              display={formatNumber(inputs.sms)}
            />
            <CalcSlider
              label="File Storage (GB)"
              icon={<HardDrive className="h-4 w-4" />}
              value={inputs.storageGb}
              min={1}
              max={50000}
              step={10}
              onChange={set("storageGb")}
              display={formatNumber(inputs.storageGb) + " GB"}
            />

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Team members</label>
                <Input
                  type="number"
                  min={1}
                  value={inputs.teamMembers}
                  onChange={(e) =>
                    setInputs((p) => ({ ...p, teamMembers: Math.max(1, Number(e.target.value) || 1) }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Monthly revenue ({currency.symbol})
                </label>
                <Input
                  type="number"
                  min={0}
                  value={Math.round(inputs.revenue * currency.rate)}
                  onChange={(e) =>
                    setInputs((p) => ({
                      ...p,
                      revenue: Math.max(0, (Number(e.target.value) || 0) / currency.rate),
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <div className="space-y-6 lg:col-span-3">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <StatCard label="Monthly cost" value={formatMoney(cost.monthly, currency)} sub={`${formatMoney(cost.annual, currency)} / year`} accent delay={0} />
            <StatCard label="Cost per user" value={formatMoney(cost.costPerUser, currency, { decimals: 2 })} sub={`${formatNumber(inputs.mau)} active users`} delay={0.05} />
            <StatCard label="Gross margin" value={`${cost.grossMargin.toFixed(0)}%`} sub={`${formatMoney(cost.profit, currency)} monthly profit`} delay={0.1} />
            <StatCard label="Break-even" value={`${formatNumber(cost.breakEvenUsers)}`} sub="paying users needed" delay={0.15} />
          </div>

          {/* Health score */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Gauge className="h-4 w-4 text-primary" /> SaaS health score
              </span>
              <span className="font-display text-2xl font-bold text-gradient">{cost.healthScore}/100</span>
            </div>
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow"
                initial={{ width: 0 }}
                animate={{ width: `${cost.healthScore}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {cost.healthScore >= 75
                ? "Excellent — investor-grade unit economics."
                : cost.healthScore >= 50
                  ? "Solid foundation with room to optimize margins."
                  : "Early stage — focus on pricing and cost efficiency."}
            </p>
          </motion.div>

          {/* Export buttons */}
          <div className="flex flex-wrap gap-3 print:hidden">
            <Button variant="hero" onClick={downloadPdf}>
              <Download className="h-4 w-4" /> Download PDF
            </Button>
            <Button variant="glass" onClick={copyResults}>
              <Copy className="h-4 w-4" /> Copy results
            </Button>
            <Button variant="glass" onClick={shareLink}>
              <Share2 className="h-4 w-4" /> Share link
            </Button>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Cost breakdown">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={2} stroke="none">
                {pieData.map((_, idx) => (
                  <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip currencySymbol={currency.symbol} />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-1.5 text-xs">
            {pieData.map((d, idx) => (
              <div key={d.name} className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: CHART_COLORS[idx % CHART_COLORS.length] }} />
                <span className="truncate">{d.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Revenue vs cost vs profit">
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={compareData} barGap={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.014 264)" vertical={false} />
              <XAxis dataKey="name" stroke="oklch(0.68 0.015 264)" fontSize={12} />
              <YAxis stroke="oklch(0.68 0.015 264)" fontSize={12} tickFormatter={(v) => currency.symbol + formatNumber(v)} />
              <Tooltip content={<ChartTooltip currencySymbol={currency.symbol} />} cursor={{ fill: "oklch(0.27 0.016 264 / 0.4)" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Revenue" fill={CHART_COLORS[2]} radius={[6, 6, 0, 0]} />
              <Bar dataKey="Cost" fill={CHART_COLORS[7]} radius={[6, 6, 0, 0]} />
              <Bar dataKey="Profit" fill={CHART_COLORS[0]} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="12-month growth projection" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS[0]} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={CHART_COLORS[0]} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="cst" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS[7]} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={CHART_COLORS[7]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.014 264)" vertical={false} />
              <XAxis dataKey="month" stroke="oklch(0.68 0.015 264)" fontSize={12} />
              <YAxis stroke="oklch(0.68 0.015 264)" fontSize={12} tickFormatter={(v) => currency.symbol + formatNumber(v)} />
              <Tooltip content={<ChartTooltip currencySymbol={currency.symbol} />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="Revenue" stroke={CHART_COLORS[0]} strokeWidth={2} fill="url(#rev)" />
              <Area type="monotone" dataKey="Cost" stroke={CHART_COLORS[7]} strokeWidth={2} fill="url(#cst)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* AI suggestions + benchmarks */}
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 lg:col-span-2"
        >
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
            <Sparkles className="h-5 w-5 text-primary" /> AI pricing suggestions
          </h3>
          <ul className="mt-4 space-y-3">
            {suggestions.map((s, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
            <TrendingUp className="h-5 w-5 text-primary" /> Benchmarks
          </h3>
          <ul className="mt-4 space-y-3">
            {BENCHMARKS.map((b) => (
              <li key={b.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{b.label}</span>
                <span className="font-semibold">{b.value}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Recommended plans */}
      <div>
        <h3 className="text-center font-display text-2xl font-bold sm:text-3xl">Recommended pricing plans</h3>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
          Auto-generated from your inputs to maximize margin while staying competitive.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={cn(
                "relative rounded-3xl p-6",
                p.highlighted ? "glass-strong glow-primary" : "glass",
              )}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}
              <h4 className="font-display text-lg font-semibold">{p.name}</h4>
              <p className="mt-3 font-display text-4xl font-bold">
                {formatMoney(p.price, currency)}
                <span className="text-base font-medium text-muted-foreground">/mo</span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{p.userLimit}</p>

              <div className="my-5 grid grid-cols-3 gap-2 rounded-xl bg-secondary/60 p-3 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Revenue</p>
                  <p className="text-sm font-semibold">{formatMoney(p.revenue, currency)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Profit</p>
                  <p className="text-sm font-semibold">{formatMoney(p.profit, currency)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Margin</p>
                  <p className="text-sm font-semibold">{p.margin.toFixed(0)}%</p>
                </div>
              </div>

              <ul className="space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant={p.highlighted ? "hero" : "glass"} className="mt-6 w-full">
                Choose {p.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("glass rounded-3xl p-6", className)}
    >
      <h3 className="mb-4 font-display text-lg font-semibold">{title}</h3>
      {children}
    </motion.div>
  );
}

function ChartTooltip({ active, payload, label, currencySymbol }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-lg px-3 py-2 text-xs shadow-lg">
      {label && <p className="mb-1 font-semibold">{label}</p>}
      {payload.map((p: any) => (
        <p key={p.name} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color || p.payload?.fill }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold">
            {currencySymbol}
            {Number(p.value).toLocaleString()}
          </span>
        </p>
      ))}
    </div>
  );
}
