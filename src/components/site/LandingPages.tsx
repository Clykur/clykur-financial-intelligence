"use client";

import { type CalculatorInputs } from "@/lib/pricing";
import { siteContent } from "@/data/site-content";

interface SEOPageProps {
  type: string;
  onApplyPreset?: (inputs: CalculatorInputs) => void;
}

type SeoModuleKey = keyof typeof siteContent.app.seo;

export function LandingPages({ type, onApplyPreset: _onApplyPreset }: SEOPageProps) {
  const { seo, modulePanel } = siteContent.app;
  const moduleKey = (type in seo ? type : "suite") as SeoModuleKey;
  const config = seo[moduleKey];

  return (
    <div className="p-0 border-0 w-full text-left font-mono">
      <div className="bg-zinc-950 p-4 sm:p-8 border-b border-border text-white">
        <span className="text-xs text-primary uppercase tracking-widest block mb-6">
          // {modulePanel.injectionPrefix} : {moduleKey.toUpperCase()}
        </span>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tighter leading-none mb-6">
          {config.h1}
        </h2>
        <p className="text-white/70 leading-relaxed text-justify max-w-3xl text-sm">
          {config.description}
        </p>
      </div>

      <div className="p-8 bg-background border-b border-border flex flex-col md:flex-row gap-12">
        <div className="md:w-1/4 border-l-4 border-primary pl-6 flex flex-col justify-start">
          <span className="text-xs text-primary uppercase tracking-widest block mb-2">
            // {modulePanel.contentEyebrow}
          </span>
          <h3 className="font-display font-bold text-lg tracking-tighter uppercase">
            {modulePanel.contentHeading}
          </h3>
        </div>
        <div className="md:w-3/4 flex flex-col justify-center">
          <p className="text-foreground leading-relaxed text-justify text-sm">{config.body}</p>
        </div>
      </div>

      <div className="p-8 bg-muted/20">
        <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-4">
          // {modulePanel.keywordsEyebrow}
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {config.keywords.map((kw) => (
            <div
              key={kw}
              className="border border-border p-3 text-xs text-muted-foreground tracking-tight text-center bg-background"
            >
              {kw.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
