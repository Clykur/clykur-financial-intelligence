"use client";

import React from "react";
import { Check, ShieldAlert, Sparkles, Building, Globe, Zap, Percent } from "lucide-react";

interface CompetitorModel {
  name: string;
  philosophy: string;
  freeTier: string;
  infraAssumption: string;
  grossMargin: number;
  unitEconomics: string;
  expansion: string;
  lessons: string[];
}

const COMPETITORS: CompetitorModel[] = [
  {
    name: "Stripe",
    philosophy:
      "Infrastructure-like utility charging transaction percentage (2.9% + 30¢). Extremely low-friction onboarding to scale volume.",
    freeTier: "No free tier subscription needed, pay-as-you-go from day one.",
    infraAssumption:
      "High compliance global database clusters, multi-region redundancy, fraud-detection compute loops.",
    grossMargin: 65,
    unitEconomics:
      "High average transaction value (ATV) offsets processing fees paid to card networks.",
    expansion:
      "Expanding into tax compliance (Stripe Tax), billing infrastructure, and corporate cards.",
    lessons: [
      "Monetize customer success directly (percentage of their revenue).",
      "Offer heavy self-serve developer tooling to capture startups early.",
    ],
  },
  {
    name: "Linear",
    philosophy:
      "Opinionated project management. Charge premium pricing ($8-$12/user/mo) for high performance and design aesthetics.",
    freeTier: "Limited to 250 active issues, prompting upgrade as team scales.",
    infraAssumption:
      "Ultra-fast sync engines, lightweight WebSockets, client-side caching database index structures.",
    grossMargin: 90,
    unitEconomics:
      "Extremely low hosting cost per active user due to client-side local-first cache.",
    expansion: "Linear Asks (ticketing), integrations ecosystem, enterprise compliance.",
    lessons: [
      "Speed and design quality can justify a price premium over incumbent giants.",
      "Syncing state on the client reduces database roundtrip costs.",
    ],
  },
  {
    name: "Vercel",
    philosophy:
      "Developer experience (DX) first hosting. Monetize serverless bandwith, serverless function invocation, and team seats.",
    freeTier: "Generous hobbyist limits, transitioning to $20/seat pro levels.",
    infraAssumption: "Global edge CDN routing networks, serverless cold starts management layers.",
    grossMargin: 70,
    unitEconomics: "Mark-up on raw AWS Lambda / Cloudfront bandwidth costs.",
    expansion: "v0 generative AI UI, analytics metrics, security firewalls.",
    lessons: [
      "Package complex cloud configurations into clean simple developer workflows.",
      "Charge margins on top of wholesale infrastructure commodities.",
    ],
  },
  {
    name: "Notion",
    philosophy:
      "Single workspace for docs, wikis, projects. Land-and-expand seat model with highly modular workspace templates.",
    freeTier: "Free for individual usage; team work requires seat subscriptions.",
    infraAssumption:
      "Heavy document indexing databases, rich-text block storage, real-time sync networks.",
    grossMargin: 85,
    unitEconomics: "Block storage database costs scale linearly but seat ARPU expands faster.",
    expansion: "Notion AI add-on (+$8-10/user/mo), enterprise security.",
    lessons: [
      "Use user-generated templates to drive viral product adoption.",
      "Add-on AI capabilities act as an excellent expansion revenue trigger.",
    ],
  },
  {
    name: "Cursor",
    philosophy:
      "AI-first code editor. Subsidize IDE distribution with premium monthly subscriptions ($20/mo) for custom models.",
    freeTier: "50 fast premium AI credits, followed by throttled slow queries.",
    infraAssumption: "GPU cluster orchestration, low-latency LLM context window hosting layers.",
    grossMargin: 60,
    unitEconomics: "Highly dependent on API token consumption and open-source model optimization.",
    expansion: "Cursor Business / Enterprise team tiers, custom repository index hosting.",
    lessons: [
      "AI SaaS must manage token cost caps to avoid negative unit economics.",
      "Create high daily utility habits (like tab autocomplete) to block churn.",
    ],
  },
  {
    name: "Supabase",
    philosophy:
      "Open-source Firebase alternative. Charge base hosting project fees ($25/project) plus usage on storage & database.",
    freeTier: "2 active projects with paused compute if inactive for 1 week.",
    infraAssumption:
      "Dedicated Postgres server instances per project, realtime webhooks listener arrays.",
    grossMargin: 75,
    unitEconomics: "Virtual machine hardware compute bundles markup relative to raw cloud costs.",
    expansion: "Enterprise compliance security, vector databases, Supabase Branching.",
    lessons: [
      "Open source developer alignment creates high organic top-of-funnel reach.",
      "Pause inactive free tiers to prevent cloud infrastructure waste.",
    ],
  },
  {
    name: "OpenAI",
    philosophy:
      "Developer APIs and custom consumer apps (ChatGPT Plus). Usage-based pricing per million tokens.",
    freeTier: "Small initial credit ($5) for API testers, standard rate limits.",
    infraAssumption: "State-of-the-art supercomputing H100/H200 GPU clusters, heavy caching.",
    grossMargin: 55,
    unitEconomics:
      "Heavy GPU depreciation and inference costs cap gross margins compared to traditional SaaS.",
    expansion: "Enterprise models, ChatGPT Search, custom agent marketplace.",
    lessons: [
      "Usage-based pricing aligns directly with compute cost scaling.",
      "Pioneer the category to dominate organic developer mindshare.",
    ],
  },
  {
    name: "Figma",
    philosophy:
      "Collaborative design. Free canvas for individuals, high pricing ($12-$75/user/mo) for design teams.",
    freeTier: "3 files, 3 pages per file, unlimited editors.",
    infraAssumption:
      "WebAssembly canvas rendering engines, high bandwidth file version history servers.",
    grossMargin: 92,
    unitEconomics: "Vector storage is light, justifying high price premiums relative to infra.",
    expansion: "FigJam whiteboarding, Dev Mode seats (developer-specific pricing).",
    lessons: [
      "Charge different rates for different user personas (e.g., designer vs developer seats).",
      "Real-time collaboration is the ultimate defense against single-player competitors.",
    ],
  },
];

export function CompetitorIntelligence() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 border border-border/80 bg-aura">
        <h3 className="font-display text-base font-bold flex items-center gap-2 text-foreground">
          <Globe className="h-5 w-5 text-primary" /> Competitor Intelligence Matrix
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Analyze pricing strategies, infrastructure architectures, estimated margins, and growth
          lessons from leading SaaS companies.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {COMPETITORS.map((comp) => (
          <div
            key={comp.name}
            className="glass rounded-2xl p-6 border border-border/70 flex flex-col justify-between hover:border-primary/40 transition"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-border/50 pb-2">
                <div className="font-display font-bold text-base flex items-center gap-2 text-foreground">
                  <Building className="h-4 w-4 text-primary" /> {comp.name}
                </div>
                <div className="flex items-center gap-1.5">
                  <Percent className="h-3.5 w-3.5 text-emerald-400" />
                  <span
                    className="text-xs font-bold text-emerald-400"
                    title="Estimated Gross Margin"
                  >
                    {comp.grossMargin}% Gross Margin
                  </span>
                </div>
              </div>

              {/* Pricing & Free Tier */}
              <div className="grid gap-2 grid-cols-2 text-xs">
                <div className="bg-secondary/40 rounded-xl p-3 border border-border/40">
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                    Pricing Philosophy
                  </div>
                  <div className="text-foreground/90 mt-1 leading-relaxed font-sans">
                    {comp.philosophy}
                  </div>
                </div>
                <div className="bg-secondary/40 rounded-xl p-3 border border-border/40">
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                    Free Tier Structure
                  </div>
                  <div className="text-foreground/90 mt-1 leading-relaxed font-sans">
                    {comp.freeTier}
                  </div>
                </div>
              </div>

              {/* Infra & Unit Economics */}
              <div className="grid gap-2 grid-cols-2 text-xs">
                <div className="bg-secondary/40 rounded-xl p-3 border border-border/40">
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                    Infra Assumptions
                  </div>
                  <div className="text-foreground/90 mt-1 leading-relaxed font-sans">
                    {comp.infraAssumption}
                  </div>
                </div>
                <div className="bg-secondary/40 rounded-xl p-3 border border-border/40">
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                    Estimated Unit Economics
                  </div>
                  <div className="text-foreground/90 mt-1 leading-relaxed font-sans">
                    {comp.unitEconomics}
                  </div>
                </div>
              </div>

              {/* Lessons */}
              <div className="bg-primary/5 rounded-xl p-3.5 border border-primary/10">
                <div className="text-[10px] text-primary font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Key Lessons for Your SaaS
                </div>
                <ul className="mt-2 space-y-1 text-[11px] text-muted-foreground">
                  {comp.lessons.map((lesson, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-primary font-bold">•</span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
