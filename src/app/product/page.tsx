import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/site-content";

export default function ProductPage() {
  const { hero, modules, details, compliance, cta } = siteContent.product;

  return (
    <div className="relative min-h-screen bg-background text-foreground site-page-pad pb-16 sm:pb-20">
      <section className="site-container py-16 sm:py-24">
        <div className="max-w-4xl mb-24">
          <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
            // {hero.eyebrow}
          </span>
          <h1 className="site-hero-title mb-6 sm:mb-8">{hero.title.split(".")[0]}.</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">{hero.subtitle}</p>
        </div>

        <div className="flex flex-col border-t border-border">
          {modules.map((m) => (
            <div
              key={m.id}
              className="flex flex-col md:flex-row gap-12 py-16 border-b border-border hover:bg-muted/10 transition-colors"
            >
              <div className="md:w-1/4 border-l-4 border-primary pl-6 flex flex-col justify-center">
                <span className="text-xs font-mono text-primary uppercase tracking-widest block mb-4">
                  {m.id}
                </span>
                <h3 className="font-display font-extrabold text-3xl tracking-tighter leading-tight">
                  {m.title.split(" ")[0]}
                  {m.title.split(" ")[1] && (
                    <>
                      <br />
                      {m.title.split(" ")[1]}
                    </>
                  )}
                </h3>
              </div>
              <div className="md:w-3/4 flex flex-col justify-center pl-0 md:pl-12">
                <p className="text-muted-foreground text-lg leading-relaxed mb-8 text-justify">
                  {m.desc}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 font-mono text-sm text-foreground">
                  {m.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <span className="text-primary">{`->`}</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="site-container py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-border pt-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
              // {details.left.eyebrow}
            </span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight leading-none mb-6">
              {details.left.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{details.left.desc}</p>
            <ul className="flex flex-col gap-3 font-mono text-sm border-l border-border pl-6">
              {details.left.features.map((feat) => (
                <li key={feat}>
                  {`->`} {feat}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-black/10 dark:border-white/10 font-mono text-xs text-zinc-800 dark:text-white/80 overflow-hidden shadow-2xl relative w-full transition-colors duration-200">
            <div className="flex items-center px-4 py-3 bg-zinc-100 dark:bg-[#2d2d2d] border-b border-black/5 dark:border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
            </div>
            <div className="p-8 overflow-x-auto flex justify-center">
              <pre className="leading-loose text-left">
                <span className="text-primary">[</span>
                <br />
                {`  `}
                <span className="text-primary">{`{`}</span>
                <br />
                {`    `}
                <span className="text-zinc-900 dark:text-white/90">"endpoint"</span>:{" "}
                <span className="text-emerald-600 dark:text-emerald-300">
                  "{details.codeSnippet[0].endpoint}"
                </span>
                ,
                <br />
                {`    `}
                <span className="text-zinc-900 dark:text-white/90">"method"</span>:{" "}
                <span className="text-emerald-600 dark:text-emerald-300">
                  "{details.codeSnippet[0].method}"
                </span>
                ,<br />
                {`    `}
                <span className="text-zinc-900 dark:text-white/90">"latency"</span>:{" "}
                <span className="text-emerald-600 dark:text-emerald-300">
                  "{details.codeSnippet[0].latency}"
                </span>
                ,<br />
                {`    `}
                <span className="text-zinc-900 dark:text-white/90">"status"</span>:{" "}
                <span className="text-amber-600 dark:text-amber-300">
                  {details.codeSnippet[0].status}
                </span>
                ,<br />
                {`    `}
                <span className="text-zinc-900 dark:text-white/90">"payload"</span>:{" "}
                <span className="text-primary">{`{`}</span>
                <br />
                {`      `}
                <span className="text-zinc-900 dark:text-white/90">"mrr_growth_cagr"</span>:{" "}
                <span className="text-amber-600 dark:text-amber-300">
                  {details.codeSnippet[0].payload.mrr_growth_cagr}
                </span>
                ,<br />
                {`      `}
                <span className="text-zinc-900 dark:text-white/90">
                  "projected_runway_months"
                </span>:{" "}
                <span className="text-amber-600 dark:text-amber-300">
                  {details.codeSnippet[0].payload.projected_runway_months}
                </span>
                ,<br />
                {`      `}
                <span className="text-zinc-900 dark:text-white/90">
                  "breakeven_confidence"
                </span>:{" "}
                <span className="text-amber-600 dark:text-amber-300">
                  {details.codeSnippet[0].payload.breakeven_confidence}
                </span>
                ,<br />
                {`      `}
                <span className="text-zinc-900 dark:text-white/90">"rule_of_40_score"</span>:{" "}
                <span className="text-amber-600 dark:text-amber-300">
                  {details.codeSnippet[0].payload.rule_of_40_score}
                </span>
                <br />
                {`    `}
                <span className="text-primary">{`}`}</span>
                <br />
                {`  `}
                <span className="text-primary">{`}`}</span>
                <br />
                <span className="text-primary">]</span>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="site-container py-16 sm:py-24">
        <div className="border-t border-b border-border py-16 text-center">
          <span className="text-xs font-mono text-primary uppercase tracking-widest block mb-4">
            // {compliance.eyebrow}
          </span>
          <h2 className="font-display text-3xl font-bold mb-4">{compliance.title}</h2>
          <p className="mx-auto mb-10 max-w-2xl text-muted-foreground">{compliance.desc}</p>
          <div className="flex flex-wrap justify-center gap-12 font-mono text-sm text-muted-foreground">
            {compliance.list.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-2">
                <span className="text-2xl text-foreground font-display font-bold">{item.name}</span>
                <span>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container py-12 sm:py-16 mb-12">
        <div className="bg-zinc-950 dark:bg-card text-zinc-50 dark:text-foreground p-12 md:p-24 flex flex-col items-center border border-border shadow-sm">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-6 tracking-tighter text-zinc-50 dark:text-foreground">
            {cta.title}
          </h2>
          <p className="text-zinc-400 dark:text-muted-foreground mb-10 max-w-xl text-center text-lg leading-relaxed">
            {cta.desc}
          </p>
          <Button
            variant="secondary"
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-bold border-0"
          >
            <Link href={cta.href}>{cta.buttonText}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
