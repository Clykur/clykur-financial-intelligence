import React from "react";
import { siteContent } from "@/data/site-content";

export default function SolutionsPage() {
  const { hero, tier1, tier2, workflows, proof } = siteContent.solutions;

  return (
    <div className="relative min-h-screen bg-background text-foreground site-page-pad pb-16 sm:pb-20">
      <section className="site-container py-16 sm:py-24">
        <div className="mb-24 grid items-start gap-12 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
              // {hero.eyebrow}
            </span>
            <h1 className="site-hero-title mb-6 sm:mb-8">
              {hero.title.split("<br />")[0]}
              {hero.title.split("<br />")[1] && (
                <>
                  <br />
                  {hero.title.split("<br />")[1]}
                </>
              )}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {hero.subtitle}
            </p>
          </div>

          {proof && (
            <div className="flex flex-col gap-4 lg:mt-6">
              {proof.map((item) => (
                <div key={item.label} className="border border-border bg-card p-6 md:p-8">
                  <p className="font-display text-4xl font-extrabold text-primary">{item.stat}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col border-t border-border">
          {/* For Startups Block */}
          <div className="flex flex-col md:flex-row gap-12 py-12 md:py-20 border-b border-border hover:bg-muted/10 transition-colors">
            <div className="md:w-1/4 border-l-4 border-primary pl-6 flex flex-col justify-start pt-2">
              <span className="text-xs font-mono text-primary uppercase tracking-widest block mb-4">
                {tier1.eyebrow}
              </span>
              <h3 className="font-display font-extrabold text-3xl tracking-tighter leading-tight">
                {tier1.title.split(" ")[0]}
                {tier1.title.split(" ")[1] && (
                  <>
                    <br />
                    {tier1.title.split(" ")[1]}
                  </>
                )}
              </h3>
            </div>
            <div className="md:w-3/4 flex flex-col justify-center pl-0 md:pl-12">
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 text-justify">
                {tier1.desc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 font-mono text-sm text-foreground">
                {tier1.features.map((feat) => (
                  <div key={feat.name} className="flex flex-col gap-2">
                    <span className="text-primary font-bold">
                      {`->`} {feat.name}
                    </span>
                    <span className="text-muted-foreground text-xs">{feat.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* For Scale-ups Block */}
          <div className="flex flex-col md:flex-row gap-12 py-12 md:py-20 border-b border-border hover:bg-muted/10 transition-colors">
            <div className="md:w-1/4 border-l-4 border-primary pl-6 flex flex-col justify-start pt-2">
              <span className="text-xs font-mono text-primary uppercase tracking-widest block mb-4">
                {tier2.eyebrow}
              </span>
              <h3 className="font-display font-extrabold text-3xl tracking-tighter leading-tight">
                {tier2.title.split(" ")[0]}
                {tier2.title.split(" ")[1] && (
                  <>
                    <br />
                    {tier2.title.split(" ")[1]}
                  </>
                )}
              </h3>
            </div>
            <div className="md:w-3/4 flex flex-col justify-center pl-0 md:pl-12">
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 text-justify">
                {tier2.desc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 font-mono text-sm text-foreground">
                {tier2.features.map((feat) => (
                  <div key={feat.name} className="flex flex-col gap-2">
                    <span className="text-primary font-bold">
                      {`->`} {feat.name}
                    </span>
                    <span className="text-muted-foreground text-xs">{feat.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
              {workflows.eyebrow}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-none mb-6">
              {workflows.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">{workflows.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-border font-mono text-sm bg-background">
            {workflows.nodes.map((node) => (
              <div
                key={node.id}
                className={`border-r border-b border-border p-10 hover:bg-muted/10 transition-colors flex flex-col h-full ${
                  node.highlighted ? "bg-primary/5" : ""
                }`}
              >
                <div className="flex justify-between items-center mb-8">
                  <span
                    className={`text-xs px-2 py-1 ${
                      node.highlighted
                        ? "bg-primary text-primary-foreground"
                        : node.id === "NODE.03"
                          ? "bg-foreground text-background"
                          : "bg-primary/10 text-primary border border-primary/20"
                    }`}
                  >
                    {node.id}
                  </span>
                  <span className="text-muted-foreground/50">{node.type}</span>
                </div>
                <span className="text-foreground font-bold block mb-4 text-xl">{node.title}</span>
                <p className="text-muted-foreground leading-relaxed flex-grow">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
