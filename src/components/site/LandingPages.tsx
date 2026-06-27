"use client";

import { Sparkles } from "lucide-react";
import { type CalculatorInputs } from "@/lib/pricing";

interface SEOPageProps {
  type: string;
  onApplyPreset?: (inputs: CalculatorInputs) => void;
}

export function LandingPages({ type, onApplyPreset: _onApplyPreset }: SEOPageProps) {
  const getPageConfig = () => {
    switch (type) {
      case "mrr":
        return {
          title: "SaaS Monthly Recurring Revenue (MRR) Calculator",
          description:
            "Accurately compute and forecast your SaaS Monthly Recurring Revenue (MRR) considering annual subscription plans, customer expansions, and churn metrics.",
          structuredData: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SaaS MRR Calculator",
            operatingSystem: "All",
            applicationCategory: "BusinessApplication",
            description: "Calculate Monthly Recurring Revenue (MRR) for SaaS startups dynamically.",
          },
          keywords: [
            "MRR Calculator",
            "SaaS revenue calculator",
            "monthly recurring revenue",
            "SaaS pricing model",
          ],
          h1: "Calculate and scale your Monthly Recurring Revenue (MRR)",
          body: "Input your customer count, contract sizes, and annual pricing tier discounts to see your blended MRR. Real-time updates help founders run scenarios on how adding 100 new signups affects net cash flow.",
        };
      case "runway":
        return {
          title: "SaaS Runway and Burn Rate Calculator",
          description:
            "Estimate how many months of cash runway your SaaS startup has left. Monitor monthly burn rate, team payroll expenses, and cloud server hosting fees.",
          structuredData: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SaaS Runway Calculator",
            operatingSystem: "All",
            applicationCategory: "BusinessApplication",
            description: "SaaS Startup runway calculator for cash burn.",
          },
          keywords: [
            "runway calculator",
            "startup burn rate",
            "cash runway",
            "SaaS survival metrics",
          ],
          h1: "Track cash runway and monthly burn rates",
          body: "Input starting cash balances, marketing spend, and team salaries. The calculator outlines your exact survival timeline in months, advising you when to raise funds or cut server bills.",
        };
      case "ltv":
        return {
          title: "SaaS Customer Lifetime Value (LTV) Calculator",
          description:
            "Compute your blended Customer Lifetime Value (LTV) using ARPU and monthly churn rate benchmarks.",
          structuredData: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SaaS LTV Calculator",
            operatingSystem: "All",
            applicationCategory: "BusinessApplication",
            description: "LTV calculation utility for software startups.",
          },
          keywords: ["LTV calculator", "customer lifetime value", "SaaS LTV", "churn rate metrics"],
          h1: "Maximize Customer Lifetime Value (LTV)",
          body: "LTV calculates how much value a user generates before churning. Reduce churn by 50% using our simulator and watch your LTV compound instantly.",
        };
      default:
        return {
          title: "SaaS Financial Unit Economics Calculator Suite",
          description:
            "Model your cost-per-user, payments fees, payroll, and growth forecast with 2026 industry benchmarks.",
          structuredData: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SaaS Financial Intelligence Calculator Suite",
            operatingSystem: "All",
            applicationCategory: "BusinessApplication",
            description: "Unified dashboard to calculate SaaS margins and cloud costs.",
          },
          keywords: [
            "SaaS pricing calculator",
            "unit economics",
            "cloud cost engine",
            "SaaS profit estimator",
          ],
          h1: "Enterprise-grade SaaS Financial Operating System",
          body: "Model raw infrastructure costs (AWS, Cloudflare, Supabase) alongside transactional services (Stripe, Twilio) to find your true Gross Margin.",
        };
    }
  };

  const config = getPageConfig();

  return (
    <div className="glass rounded-3xl p-8 border border-border/60 max-w-4xl mx-auto my-12 bg-aura">
      {/* Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(config.structuredData) }}
      />

      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
        SEO Landing Page: {type.toUpperCase()} Mode
      </span>

      <h2 className="mt-4 font-display text-2xl font-black tracking-tight sm:text-3xl text-foreground">
        {config.h1}
      </h2>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{config.description}</p>

      <div className="mt-6 border-t border-border/50 pt-6 text-xs text-muted-foreground leading-relaxed">
        {config.body}
      </div>

      <div className="mt-8 flex flex-wrap gap-2.5">
        <span className="bg-secondary/60 text-foreground text-[10px] px-2.5 py-1 rounded-md border border-border font-medium">
          SEO Keywords: {config.keywords.join(" · ")}
        </span>
      </div>
    </div>
  );
}
