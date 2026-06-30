import React from "react";
import { siteContent } from "@/data/site-content";

export default function CompanyPage() {
  const { hero, mission, deployment, backers, values } = siteContent.company;

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

          {values && (
            <div className="flex flex-col gap-4 lg:mt-6">
              {values.map((v) => (
                <div key={v.title} className="border border-border bg-card p-6 md:p-8">
                  <h3 className="font-display text-xl font-bold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col border-t border-border">
          <div className="flex flex-col md:flex-row gap-12 py-12 md:py-20 border-b border-border hover:bg-muted/10 transition-colors">
            <div className="md:w-1/4 border-l-4 border-primary pl-6 flex flex-col justify-start pt-2">
              <span className="text-xs font-mono text-primary uppercase tracking-widest block mb-4">
                {mission.eyebrow}
              </span>
              <h3 className="font-display font-extrabold text-3xl tracking-tighter leading-tight">
                {mission.title.split(" ")[0]}
                {mission.title.split(" ")[1] && (
                  <>
                    <br />
                    {mission.title.split(" ")[1]}
                  </>
                )}
              </h3>
            </div>
            <div className="md:w-3/4 flex flex-col justify-center pl-0 md:pl-12">
              <div className="bg-zinc-950 dark:bg-card p-8 border border-border text-zinc-50 dark:text-foreground shadow-sm">
                <p className="font-mono text-lg leading-relaxed text-justify">{mission.desc}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-12 py-12 md:py-20 border-b border-border hover:bg-muted/10 transition-colors">
            <div className="md:w-1/4 border-l-4 border-primary pl-6 flex flex-col justify-start pt-2">
              <span className="text-xs font-mono text-primary uppercase tracking-widest block mb-4">
                {deployment.eyebrow}
              </span>
              <h3 className="font-display font-extrabold text-3xl tracking-tighter leading-tight">
                {deployment.title.split(" ")[0]}
                {deployment.title.split(" ")[1] && (
                  <>
                    <br />
                    {deployment.title.split(" ")[1]}
                  </>
                )}
              </h3>
            </div>
            <div className="md:w-3/4 flex flex-col justify-center pl-0 md:pl-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 font-mono text-sm text-foreground">
                {deployment.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-3 p-6 border border-border bg-background"
                  >
                    <span className="text-primary font-bold border-b border-border pb-2 uppercase tracking-widest text-xs">
                      {item.label}
                    </span>
                    {item.status ? (
                      <span className="text-emerald-500 flex items-center gap-2 mt-2 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
                        {item.value}
                      </span>
                    ) : (
                      <span className="text-foreground mt-2">
                        {item.value}
                        {item.sub && (
                          <>
                            <br />
                            <span className="text-muted-foreground text-xs">{item.sub}</span>
                          </>
                        )}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
              {backers.eyebrow}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-none mb-6">
              {backers.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">{backers.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-border bg-background">
            {backers.list.map((backer) => (
              <div
                key={backer.name}
                className={`border-r border-b border-border p-12 hover:bg-muted/10 transition-colors flex items-center justify-center min-h-[200px] ${
                  backer.highlighted
                    ? "bg-primary/5 text-primary"
                    : backer.darkBg
                      ? "bg-zinc-950 dark:bg-card text-zinc-50 dark:text-foreground"
                      : "text-foreground"
                }`}
              >
                <span
                  className={`font-display font-extrabold text-4xl tracking-tighter ${
                    backer.highlighted ? "text-primary" : ""
                  }`}
                >
                  {backer.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
