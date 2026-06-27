"use client";

import React, { useState } from "react";
import {
  Sparkles,
  BrainCircuit,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { CalculatorInputs, CostResult, formatMoney, type Currency } from "@/lib/pricing";

interface CfoAdvisorProps {
  inputs: CalculatorInputs;
  results: CostResult;
  currencySymbol: string;
  activeCurrency: Currency;
}

interface QuestionPreset {
  q: string;
  category: string;
  title: string;
}

const QUESTION_PRESETS: QuestionPreset[] = [
  {
    q: "Should I hire another engineer right now?",
    category: "Hiring",
    title: "Can I afford another developer?",
  },
  {
    q: "Should I increase our prices by 20%?",
    category: "Pricing",
    title: "Should I increase prices?",
  },
  {
    q: "Why is our monthly burn rate high, and how can we reduce it?",
    category: "Burn",
    title: "Why is my burn high?",
  },
  {
    q: "What enterprise pricing tiers and features should I establish?",
    category: "Pricing",
    title: "Enterprise tier model",
  },
  {
    q: "How can I achieve an 80%+ Gross Margin?",
    category: "Margin",
    title: "How to reach 80% margin?",
  },
  {
    q: "Is it financially viable to migrate to Cloudflare & R2?",
    category: "Cloud",
    title: "Should we migrate cloud?",
  },
  {
    q: "When should we plan our next fundraising round?",
    category: "Funding",
    title: "When should I raise funding?",
  },
];

interface CfoResponse {
  answer: string;
  calculations: Array<{ label: string; formula: string; result: string }>;
  risks: string[];
  recommendations: string[];
  alternatives: string[];
  confidence: number; // 0 - 100
  assumptions: string[];
}

export function CfoAdvisor({
  inputs,
  results,
  currencySymbol: _,
  activeCurrency,
}: CfoAdvisorProps) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<CfoResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const getCfoAdvice = (question: string): CfoResponse => {
    const qLower = question.toLowerCase();

    // Default fallback
    const ans = {
      answer:
        "I have evaluated your SaaS financials based on current inputs. Let's look at the runway, pricing strategy, and gross margin levels to determine the optimal next steps.",
      calculations: [
        {
          label: "Monthly Gross Profit",
          formula: "MRR - Hosting/APIs Cost",
          result: formatMoney(
            results.revenue - (results.infrastructure + results.services),
            activeCurrency,
          ),
        },
        {
          label: "Monthly Net Profit",
          formula: "Gross Profit - Operating Spend",
          result: formatMoney(results.netProfit, activeCurrency),
        },
        {
          label: "Rule of 40 Status",
          formula: "YoY Growth + Net Profit Margin",
          result: `${results.metrics.ruleOf40.toFixed(0)}%`,
        },
      ],
      risks: [
        "Growth could plateau if customer acquisition relies purely on high-CAC marketing campaigns.",
        "A lack of annual payment plans adds immediate pressure on monthly cash collections.",
      ],
      recommendations: [
        "Incentivize annual payment structures by offering 2 months free.",
        "Implement tighter checks on database read queries to decrease hosting margins.",
      ],
      alternatives: [
        "Consider a usage-based fee structure instead of flat rates to capture high-value customer expansion.",
        "Build a lightweight free tier to organically scale user signups and drop down paid CAC.",
      ],
      confidence: 85,
      assumptions: [
        "Operational spends remain flat over the next 12 months.",
        "SaaS Churn rate holds steady without seasonal spikes.",
      ],
    };

    if (qLower.includes("hire") || qLower.includes("developer") || qLower.includes("engineer")) {
      const salary = 8500; // standard new engineer salary assumption
      const currentNetProfit = results.netProfit;
      const finalNet = currentNetProfit - salary;
      const canAfford = currentNetProfit > salary && results.runwayMonths > 12;

      ans.confidence = 90;
      ans.assumptions = [
        `Estimated loaded cost of new engineer: ${formatMoney(salary, activeCurrency)}/mo`,
        "No immediate drop in ARPU or sudden customer churn spike.",
        "Productivity ramp-up time of 3 months before engineering velocity impacts expansion.",
      ];

      if (canAfford) {
        ans.answer = `Yes, the financial model indicates you can afford to hire another engineer. Your net profit is currently ${formatMoney(currentNetProfit, activeCurrency)}/mo, which comfortably covers the estimated cost of ${formatMoney(salary, activeCurrency)}/mo. Additionally, your runway is safe (${results.runwayMonths === 999 ? "Infinite" : results.runwayMonths.toFixed(1) + " months"}).`;
        ans.calculations = [
          {
            label: "Current Net Profit",
            formula: "MRR - Expenses",
            result: formatMoney(currentNetProfit, activeCurrency),
          },
          {
            label: "New Engineer Salary",
            formula: "Base standard",
            result: formatMoney(salary, activeCurrency),
          },
          {
            label: "Post-Hire Net Profit",
            formula: "Current Net - Salary",
            result: formatMoney(finalNet, activeCurrency),
          },
        ];
        ans.risks = [
          "Post-hire net margin will shrink, reducing cash safety buffers.",
          "Engineering ramp-up delay might delay expected feature launches.",
        ];
        ans.recommendations = [
          "Proceed with hiring, focusing on a developer who can directly impact revenue growth or infra efficiency.",
          "Set a clear milestones plan for the new engineer's first 90 days.",
        ];
        ans.alternatives = [
          "Hire a contract developer on a part-time basis to test feature market fit before committing to full-time payroll.",
          "Invest in developer tooling to boost efficiency of existing team members.",
        ];
      } else {
        const deficit = salary - currentNetProfit;
        ans.answer = `I advise AGAINST hiring another full-time engineer right now. Your current net profit of ${formatMoney(currentNetProfit, activeCurrency)}/mo is insufficient to support an additional salary of ${formatMoney(salary, activeCurrency)}/mo, which would result in a monthly cash deficit of ${formatMoney(-deficit, activeCurrency)} or a significant decrease in your current runway (${results.runwayMonths === 999 ? "Profitable" : results.runwayMonths.toFixed(1) + " months"}).`;
        ans.calculations = [
          {
            label: "Current Monthly Net",
            formula: "MRR - Expenses",
            result: formatMoney(currentNetProfit, activeCurrency),
          },
          {
            label: "Deficit Contribution",
            formula: "Net Profit - salary",
            result: formatMoney(finalNet, activeCurrency),
          },
          {
            label: "Runway Decrease Estimate",
            formula: "Cash / New Burn Rate",
            result: `${Math.max(0, Math.round(inputs.startingCash / Math.abs(finalNet)))} months`,
          },
        ];
        ans.risks = [
          "Hiring now risks accelerating your default runway date to less than 6 months.",
          "Increased burn puts pressure on founders to raise premature dilutive capital.",
        ];
        ans.recommendations = [
          "Postpone hiring until Monthly Recurring Revenue (MRR) increases by at least $10,000.",
          "Audit existing server configurations to recoup budget that can fund payroll.",
        ];
        ans.alternatives = [
          "Utilize high-agency outsourced contractors for targeted development sprints.",
          "Optimize pricing to expand average ARPU, funding payroll organically.",
        ];
      }
    } else if (
      qLower.includes("price") ||
      qLower.includes("increase") ||
      qLower.includes("pricing")
    ) {
      const originalRev = results.revenue;
      const targetArpu = inputs.arpu * 1.2;
      const postPriceRevenue = originalRev * 1.2;

      ans.confidence = 88;
      ans.assumptions = [
        "A 20% price hike triggers a temporary 1.5% churn spike.",
        "Your product provides high utility to existing users (inelastic demand).",
        "New customers accept the higher pricing point.",
      ];
      ans.answer = `I recommend implementing a 20% price increase. Based on your current ARPU of ${formatMoney(inputs.arpu, activeCurrency)}, raising prices to ${formatMoney(targetArpu, activeCurrency)} will expand monthly revenue to approximately ${formatMoney(postPriceRevenue, activeCurrency)}, boosting gross margins to ${(results.grossMargin * 1.05).toFixed(1)}%. Even with a simulated churn spike, the net cash return remains highly positive.`;
      ans.calculations = [
        {
          label: "Current Price (ARPU)",
          formula: "Base inputs",
          result: formatMoney(inputs.arpu, activeCurrency),
        },
        {
          label: "Target Price (+20%)",
          formula: "ARPU * 1.2",
          result: formatMoney(targetArpu, activeCurrency),
        },
        {
          label: "Projected MRR Boost",
          formula: "New MRR - Current MRR",
          result: formatMoney(postPriceRevenue - originalRev, activeCurrency),
        },
      ];
      ans.risks = [
        "Churn could spike higher than 1.5% if the product value proposition is weak.",
        "Negative customer feedback on public forums like Hacker News or X.",
      ];
      ans.recommendations = [
        "Grandfather existing customers on the old price for 6-12 months to reward loyalty and reduce churn.",
        "Repackage the tiers: add a new premium feature to justify the price increase.",
      ];
      ans.alternatives = [
        "Introduce usage-based add-ons rather than a flat price hike.",
        "Create an annual contract option at the original rate to lock in users upfront.",
      ];
    } else if (qLower.includes("burn") || qLower.includes("high") || qLower.includes("reduce")) {
      ans.confidence = 92;
      ans.assumptions = [
        "Operational spends are highly addressable.",
        "Infrastructure uses default cloud hosting limits without caching layers.",
        "Ad spends CAC efficiency is low.",
      ];
      ans.answer = `Your monthly burn rate is ${formatMoney(results.burnRate, activeCurrency)}. The main driver is ${results.operational > results.infrastructure ? "Team Payroll & Tools" : "Cloud Infrastructure Costs"}. By optimization of your cloud provider settings and tool seats, you can cut burn by an estimated 15-20% without impacting growth speed.`;
      ans.calculations = [
        {
          label: "Monthly Burn Rate",
          formula: "Net monthly outflow",
          result: formatMoney(results.burnRate, activeCurrency),
        },
        {
          label: "Infrastructure Share",
          formula: "COGS / Expenses",
          result: `${((results.infrastructure / Math.max(1, results.monthlyExpenses)) * 100).toFixed(0)}%`,
        },
        {
          label: "Target Monthly Savings",
          formula: "Burn * 0.15",
          result: formatMoney(results.burnRate * 0.15, activeCurrency),
        },
      ];
      ans.risks = [
        "Over-optimizing cloud hosting could impact API latency if not carefully tested.",
        "Cutting marketing spends directly decelerates MRR compounding speed.",
      ];
      ans.recommendations = [
        "Audit cloud hosting. If on AWS, check idle RDS/EC2 resources. If Vercel/Supabase, migrate storage to Cloudflare R2.",
        "Cancel unused tool licenses (Notion, Slack seats of past contractors).",
      ];
      ans.alternatives = [
        "Leverage annual credits from AWS/GCP startup programs.",
        "Move manual operational flows to automated background AI scripts.",
      ];
    } else if (qLower.includes("enterprise")) {
      const enterprisePrice = inputs.arpu * 8;
      ans.confidence = 80;
      ans.assumptions = [
        "Enterprise customers require custom contracts, SSO, and SLAs.",
        "Average sales cycles last between 30 and 90 days.",
        "Each enterprise customer generates at least 8x SMB ARPU.",
      ];
      ans.answer = `To scale mid-market/enterprise contracts, you should introduce a dedicated 'Enterprise' tier priced at a minimum of ${formatMoney(enterprisePrice, activeCurrency)}/mo. This plan should package advanced security (SAML/SSO), compliance logs, custom database hosting, and guaranteed SLAs.`;
      ans.calculations = [
        {
          label: "Suggested Enterprise ARPU",
          formula: "ARPU * 8 (Minimum)",
          result: formatMoney(enterprisePrice, activeCurrency),
        },
        {
          label: "Margin Contribution",
          formula: "Enterprise revenue - allocated cost",
          result: "92%",
        },
        {
          label: "LTV Projection",
          formula: "Enterprise Price / 1.5% churn",
          result: formatMoney(enterprisePrice / 0.015, activeCurrency),
        },
      ];
      ans.risks = [
        "Support loads will increase, requiring dedicated account managers.",
        "Slow sales cycles could deplete cash before contracts close.",
      ];
      ans.recommendations = [
        "Integrate BoxyHQ or WorkOS to instantly support SAML/SSO capabilities.",
        "Create standard security whitepapers to expedite enterprise review cycles.",
      ];
      ans.alternatives = [
        "Maintain current pricing plans but offer a 'custom add-on package' for security.",
        "Begin with self-serve team pricing (e.g. per seat pricing) before custom contracts.",
      ];
    } else if (qLower.includes("margin") || qLower.includes("80")) {
      const targetCogs = results.revenue * 0.2;
      const reductionNeeded = results.infrastructure + results.services - targetCogs;
      ans.confidence = 94;
      ans.assumptions = [
        "ARPU is high enough to support healthy margins.",
        "Your cloud code execution has caching inefficiencies.",
        "Stripe payments processing fees are fully optimized.",
      ];
      ans.answer = `Your current gross margin is ${results.grossMargin.toFixed(1)}%. To reach your goal of 80%+, you need to optimize your cost of goods sold (COGS) by ${formatMoney(Math.max(0, reductionNeeded), activeCurrency)}/mo or raise prices. The most immediate path is migrating compute from AWS or GCP to Cloudflare Workers or Edge computing.`;
      ans.calculations = [
        {
          label: "Current Gross Margin",
          formula: "Revenue - COGS",
          result: `${results.grossMargin.toFixed(1)}%`,
        },
        {
          label: "COGS Target (20% of MRR)",
          formula: "MRR * 0.2",
          result: formatMoney(targetCogs, activeCurrency),
        },
        {
          label: "Overhead Reduction Needed",
          formula: "COGS - Target COGS",
          result: formatMoney(Math.max(0, reductionNeeded), activeCurrency),
        },
      ];
      ans.risks = [
        "Migrating database layers could cause temporary downtime if not managed carefully.",
        "Serverless execution limits might restrict highly CPU-intensive calculations.",
      ];
      ans.recommendations = [
        "Cache database queries via Redis (Upstash) to avoid duplicate Supabase/Neon hits.",
        "Serve static assets strictly through a CDN (Cloudflare CDN / Cloudfront) to avoid compute charges.",
      ];
      ans.alternatives = [
        "Charge payment processing fees back to customers as a convenience charge.",
        "Discontinue free tiers that consume high compute resources.",
      ];
    } else if (
      qLower.includes("migrate") ||
      qLower.includes("cloudflare") ||
      qLower.includes("aws")
    ) {
      const currentInfra = results.infrastructure;
      const estimatedCloudflareCost =
        10 + (inputs.apiRequests / 1_000_000) * 0.5 + inputs.storageGb * 0.015;
      const monthlySavings = currentInfra - estimatedCloudflareCost;

      ans.confidence = 96;
      ans.assumptions = [
        "You migrate all media storage from S3 to Cloudflare R2.",
        "Edge routing eliminates high egress pricing rates.",
        "Migration requires 2 engineering weeks.",
      ];
      ans.answer = `Yes, migrating key infrastructure to Cloudflare & R2 is highly recommended. It will drop database & CDN expenses to approximately ${formatMoney(estimatedCloudflareCost, activeCurrency)}/mo, saving your business ${formatMoney(Math.max(0, monthlySavings), activeCurrency)} every month.`;
      ans.calculations = [
        {
          label: "Current Infra Costs",
          formula: "Base cloud provider cost",
          result: formatMoney(currentInfra, activeCurrency),
        },
        {
          label: "Projected Cloudflare Costs",
          formula: "Serverless edge + R2 storage",
          result: formatMoney(estimatedCloudflareCost, activeCurrency),
        },
        {
          label: "Estimated Monthly Savings",
          formula: "Current - Projected",
          result: formatMoney(Math.max(0, monthlySavings), activeCurrency),
        },
      ];
      ans.risks = [
        "SDK code updates required to swap standard client libraries.",
        "Egress fees from the old provider during the initial data synchronization phase.",
      ];
      ans.recommendations = [
        "Use Cloudflare's R2 Migrator tool to copy S3 buckets seamlessly with zero downtime.",
        "Test edge database connections to ensure minimal latency.",
      ];
      ans.alternatives = [
        "Stay on current provider but purchase compute saving plans (1-3 year commitments).",
        "Introduce strict file size upload limits for users to reduce raw storage requirements.",
      ];
    } else if (
      qLower.includes("fundraising") ||
      qLower.includes("raise") ||
      qLower.includes("funding")
    ) {
      const health = results.healthScore;
      const ready = health >= 75;
      ans.confidence = 85;
      ans.assumptions = [
        "VC fundraising cycles take 3 to 6 months.",
        "Investors require a minimum of 12 months runway post-raise.",
        "Market conditions favor capital-efficient startups.",
      ];
      ans.answer = ready
        ? `Your SaaS Health Score is ${health}/100, indicating you are in a strong position to raise capital. With healthy margins (${results.grossMargin.toFixed(0)}%) and good LTV:CAC, you should plan to launch your fundraising round within the next 2-3 months to secure growth fuel.`
        : `Your SaaS Health Score is currently ${health}/100, which is below the premium investor-ready threshold of 75. You should hold off fundraising for 3 months to optimize unit economics, focus on churn, and push your health score up first.`;
      ans.calculations = [
        { label: "SaaS Health Score", formula: "Weighted index", result: `${health}/100` },
        {
          label: "LTV:CAC Grade",
          formula: "Payback index",
          result: `${results.metrics.ltvToCac.toFixed(1)}x`,
        },
        {
          label: "Current Runway Buffer",
          formula: "Cash / Net Burn",
          result:
            results.runwayMonths === 999 ? "Profitable" : `${results.runwayMonths.toFixed(1)} mo`,
        },
      ];
      ans.risks = [
        "Fundraising distraction can decelerate product development focus.",
        "Market valuation multiples remain compressed compared to previous years.",
      ];
      ans.recommendations = [
        "Draft a pitch deck detailing your clear path to $1M ARR.",
        "Set up initial informational chats with early-stage investors before officially launching the round.",
      ];
      ans.alternatives = [
        "Pursue non-dilutive revenue-based financing (e.g. Founderpath, Pipe) to avoid dilution.",
        "Bootstrap to break-even using pricing optimization, maintaining 100% founder control.",
      ];
    }

    return ans;
  };

  const handlePresetSelect = (presetQ: string) => {
    setLoading(true);
    setQuery(presetQ);
    setTimeout(() => {
      setResponse(getCfoAdvice(presetQ));
      setLoading(false);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResponse(getCfoAdvice(query));
      setLoading(false);
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 border border-border/80 bg-aura">
        <h3 className="font-display text-base font-bold flex items-center gap-2 text-foreground">
          <BrainCircuit className="h-5 w-5 text-primary" /> Conversational AI CFO Advisor
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Obtain automated CFO analysis, risks reports, and strategic calculations based on your
          active business model numbers.
        </p>

        {/* Presets Grid */}
        <div className="mt-4 flex flex-wrap gap-2">
          {QUESTION_PRESETS.map((preset, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handlePresetSelect(preset.q)}
              className="text-[11px] bg-secondary hover:bg-accent border border-border px-3 py-1.5 rounded-lg transition text-left text-foreground hover:border-primary/50"
            >
              {preset.title}
            </button>
          ))}
        </div>

        {/* Custom Input Form */}
        <form onSubmit={handleCustomSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask the CFO: Can I afford to hire? Should we raise prices?..."
            className="flex-1 bg-secondary border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 rounded-xl text-xs flex items-center gap-1.5 transition disabled:opacity-50"
          >
            Ask CFO <ArrowRight className="h-3 w-3" />
          </button>
        </form>
      </div>

      {loading && (
        <div className="glass rounded-2xl p-8 border border-border flex flex-col items-center justify-center space-y-3 min-h-[250px]">
          <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-muted-foreground animate-pulse font-medium">
            AI CFO is compiling financial ledgers, auditing margins, and evaluating risk curves...
          </p>
        </div>
      )}

      {!loading && response && (
        <div className="space-y-6">
          {/* Main Answer card */}
          <div className="glass rounded-2xl p-6 border border-border/80 space-y-4">
            <div className="flex justify-between items-center border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                <Sparkles className="h-4 w-4" /> AI CFO Analysis Report
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">Confidence Score:</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    response.confidence >= 90
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {response.confidence}%
                </span>
              </div>
            </div>

            <p className="text-sm text-foreground/90 leading-relaxed font-sans font-medium">
              {response.answer}
            </p>

            {/* Calculations Grid */}
            <div className="space-y-2 mt-4">
              <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Audited Financial Calculations
              </h4>
              <div className="grid gap-2 sm:grid-cols-3">
                {response.calculations.map((calc, i) => (
                  <div key={i} className="bg-secondary/40 border border-border/50 rounded-xl p-3">
                    <div className="text-[10px] text-muted-foreground truncate">{calc.label}</div>
                    <div className="text-sm font-bold text-foreground mt-0.5">{calc.result}</div>
                    <div className="text-[9px] text-muted-foreground font-mono mt-1">
                      {calc.formula}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risks & Recommendations Grid */}
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              {/* Risks */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" /> High Risk Factors
                </h4>
                <ul className="space-y-1.5">
                  {response.risks.map((risk, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-rose-400 font-bold mt-0.5">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5" /> Recommended CFO Actions
                </h4>
                <ul className="space-y-1.5">
                  {response.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-emerald-400 font-bold mt-0.5">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Alternatives & Assumptions */}
            <div className="grid gap-4 sm:grid-cols-2 border-t border-border/60 pt-4 mt-4">
              {/* Alternatives */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5" /> Suggested Alternatives
                </h4>
                <ul className="space-y-1.5">
                  {response.alternatives.map((alt, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>{alt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Assumptions */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  Model Assumptions
                </h4>
                <ul className="space-y-1.5">
                  {response.assumptions.map((asm, idx) => (
                    <li
                      key={idx}
                      className="text-[11px] text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-muted-foreground/60 mt-0.5">▪</span>
                      <span>{asm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
