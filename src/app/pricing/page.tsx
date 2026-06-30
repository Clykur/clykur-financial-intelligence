import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/site-content";

type CellValue = boolean | string;

function ComparisonCell({ value }: { value: CellValue }) {
  if (value === true) {
    return <span className="font-mono text-primary font-bold">✓</span>;
  }
  if (value === false) {
    return <span className="text-muted-foreground/40">—</span>;
  }
  return <span className="font-mono text-sm text-foreground">{value}</span>;
}

export default function PricingPage() {
  const { hero, trust, tiers, comparison, faq, cta } = siteContent.pricing;

  return (
    <div className="relative min-h-screen bg-background text-foreground site-page-pad pb-16 sm:pb-20">
      {/* Hero */}
      <section className="site-container py-12 sm:py-20">
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
              // {hero.eyebrow}
            </span>
            <h1 className="site-hero-title mb-6 sm:mb-8">
              {hero.title.split(".")[0]}.
              {hero.title.split(".")[1] && (
                <>
                  <br />
                  {hero.title.split(".")[1].trim()}.
                </>
              )}
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {hero.subtitle}
            </p>
          </div>

          {trust && (
            <div className="border border-border bg-muted/20 p-8 lg:mt-6">
              <h2 className="font-display text-2xl font-bold mb-4">{trust.title}</h2>
              <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                {trust.items.map((line) => (
                  <li key={line} className="flex gap-2 leading-relaxed">
                    <span className="text-primary shrink-0">{`->`}</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Tier cards */}
      <section className="site-container">
        <div className="grid grid-cols-1 gap-0 border border-border lg:grid-cols-3">
          {tiers.map((tier) => {
            const isRecommended = tier.recommended;
            const isEnterprise = tier.price === "Custom";

            return (
              <div
                key={tier.id}
                className={`flex flex-col border-b border-border p-10 md:p-12 lg:border-b-0 lg:border-r lg:last:border-r-0 ${
                  isRecommended
                    ? "bg-primary/5 xl:-my-4 xl:py-16 xl:shadow-lg xl:relative xl:z-10"
                    : isEnterprise
                      ? "bg-zinc-950 dark:bg-card text-zinc-50 dark:text-foreground"
                      : "bg-background hover:bg-muted/10 transition-colors"
                }`}
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span
                    className={`text-xs font-mono uppercase tracking-widest ${
                      isEnterprise
                        ? "text-zinc-500 dark:text-muted-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {tier.id}
                  </span>
                  {isRecommended && (
                    <span className="bg-primary px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-primary-foreground">
                      Recommended
                    </span>
                  )}
                </div>

                <h3
                  className={`font-display text-3xl font-bold tracking-tight mb-2 ${
                    isRecommended ? "text-primary" : ""
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`mb-6 text-sm leading-relaxed ${
                    isEnterprise
                      ? "text-zinc-400 dark:text-muted-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {tier.desc}
                </p>

                <div className="mb-2 flex items-end gap-1">
                  <span className="text-5xl font-extrabold tracking-tighter">{tier.price}</span>
                  {tier.price !== "Custom" && (
                    <span className="mb-2 font-mono text-xs text-muted-foreground">/mo</span>
                  )}
                </div>
                {"priceNote" in tier && tier.priceNote && (
                  <p
                    className={`mb-8 font-mono text-xs ${
                      isEnterprise
                        ? "text-zinc-500 dark:text-muted-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {tier.priceNote}
                  </p>
                )}

                <ul
                  className={`mb-10 flex-1 space-y-3 font-mono text-sm ${
                    isEnterprise ? "text-zinc-300 dark:text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <span className="text-primary font-bold shrink-0">{`->`}</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                  {tier.unavailable?.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 opacity-60">
                      <span className="text-muted-foreground shrink-0">{`->`}</span>
                      <span className="text-muted-foreground line-through decoration-muted-foreground/40">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={isRecommended ? "hero" : isEnterprise ? "secondary" : "outline"}
                  className={`w-full rounded-none ${
                    isEnterprise
                      ? "border-0 bg-white font-bold text-black hover:bg-zinc-200 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                      : !isRecommended
                        ? "border-border hover:bg-muted"
                        : ""
                  }`}
                  asChild
                >
                  <Link href={tier.href}>{tier.cta}</Link>
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison table */}
      {comparison && (
        <section className="site-container py-16 sm:py-24">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
              {comparison.eyebrow}
            </span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight">
              {comparison.title}
            </h2>
          </div>

          <div className="overflow-x-auto border border-border">
            <table className="w-full min-w-[640px] border-collapse font-mono text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="p-4 text-left font-normal text-muted-foreground">Feature</th>
                  <th className="p-4 text-center font-display text-base font-bold">Builder</th>
                  <th className="p-4 text-center font-display text-base font-bold text-primary">
                    Pro
                  </th>
                  <th className="p-4 text-center font-display text-base font-bold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparison.categories.map((cat) => (
                  <React.Fragment key={cat.name}>
                    <tr className="border-b border-border bg-background">
                      <td
                        colSpan={4}
                        className="p-3 pl-4 text-xs font-bold uppercase tracking-widest text-primary"
                      >
                        {cat.name}
                      </td>
                    </tr>
                    {cat.rows.map((row) => (
                      <tr key={row.label} className="border-b border-border hover:bg-muted/10">
                        <td className="p-4 text-foreground">{row.label}</td>
                        <td className="p-4 text-center">
                          <ComparisonCell value={row.builder} />
                        </td>
                        <td className="p-4 text-center bg-primary/5">
                          <ComparisonCell value={row.pro} />
                        </td>
                        <td className="p-4 text-center">
                          <ComparisonCell value={row.enterprise} />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faq && (
        <section className="site-container border-t border-border px-4 py-24 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
                {faq.eyebrow}
              </span>
              <h2 className="font-display text-4xl font-extrabold tracking-tight">{faq.title}</h2>
            </div>
            <div className="lg:col-span-8 space-y-10">
              {faq.items.map((item) => (
                <div key={item.q} className="border-l-4 border-primary pl-6">
                  <h3 className="font-display text-lg font-bold text-foreground">{item.q}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {cta && (
        <section className="site-container pb-8 sm:px-6">
          <div className="border border-border bg-zinc-950 p-12 text-center dark:bg-card md:p-20">
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tighter text-zinc-50 dark:text-foreground mb-6">
              {cta.title}
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-zinc-400 dark:text-muted-foreground">
              {cta.desc}
            </p>
            <Button variant="hero" size="lg" asChild className="rounded-none">
              <Link href={cta.href}>{cta.buttonText}</Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
