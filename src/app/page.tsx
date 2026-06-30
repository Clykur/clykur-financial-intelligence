"use client";

import React from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

import { HeroWorkflowAnimation } from "@/components/site/HeroWorkflowAnimation";
import { siteContent } from "@/data/site-content";

export default function IndexPage() {
  return (
    <div
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-300"
    >
      <Toaster position="top-center" richColors />

      {/* Hero Header */}
      <section
        id="Top"
        className="relative bg-background site-page-pad pb-12 sm:pb-16 lg:pb-20 lg:min-h-[calc(100dvh-var(--site-header-height))] lg:flex lg:items-center"
      >
        <div className="site-container w-full">
          <div className="grid min-w-0 gap-8 md:grid-cols-2 md:items-start md:gap-12 lg:gap-16 lg:items-center">
            <div className="min-w-0 flex flex-col">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="site-hero-title"
              >
                {siteContent.homepage.hero.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-5 max-w-lg text-base sm:text-lg text-muted-foreground"
              >
                {siteContent.homepage.hero.subtitle}
              </motion.p>
              {siteContent.homepage.hero.trustLine && (
                <p className="mt-4 max-w-lg text-xs sm:text-sm font-mono text-muted-foreground leading-relaxed">
                  {siteContent.homepage.hero.trustLine}
                </p>
              )}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Button variant="hero" size="lg" asChild>
                  <Link href={siteContent.homepage.hero.cta.href}>
                    {siteContent.homepage.hero.cta.text} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-12 hidden flex-col gap-4 md:flex"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {siteContent.homepage.hero.trustedLabel}
                </span>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-10">
                  {siteContent.homepage.hero.companies.map((company) => (
                    <span key={company} className="font-display font-bold text-base sm:text-lg">
                      {company}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative w-full min-w-0 md:sticky md:top-[calc(var(--site-header-height)+1rem)]"
            >
              <HeroWorkflowAnimation />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 md:hidden"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {siteContent.homepage.hero.trustedLabel}
              </span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                {siteContent.homepage.hero.companies.map((company) => (
                  <span key={company} className="font-display font-bold text-base">
                    {company}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {siteContent.homepage.hero.trustPillars && (
        <section className="border-b border-border bg-muted/30 py-10">
          <div className="site-container grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteContent.homepage.hero.trustPillars.map((item) => (
              <div key={item.label} className="border border-border bg-background p-6">
                <p className="font-display text-lg font-bold">{item.label}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Integrations Section */}
      <section className="border-t border-b border-border bg-background py-10">
        <div className="site-container flex flex-col md:flex-row items-center gap-8 justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
            {siteContent.homepage.integrations.label}
          </span>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-12 gap-y-6 opacity-60 grayscale">
            {siteContent.homepage.integrations.list.map((item) => (
              <span key={item} className="font-display font-bold text-xl">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview Grid */}
      <section id="features" className="site-container py-16 sm:py-24">
        <SectionHeading
          eyebrow={siteContent.homepage.features.eyebrow}
          title={siteContent.homepage.features.title}
          subtitle={siteContent.homepage.features.subtitle}
        />
        <div className="mt-16 grid gap-0 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
          {siteContent.homepage.features.items.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{
                opacity: 0,
                y: 32,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group border-r border-b border-border p-8 transition-colors duration-200 hover:bg-muted/50"
            >
              <motion.span
                whileHover={{
                  rotate: 6,
                  scale: 1.08,
                }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 15,
                }}
                className="group grid h-12 w-12 place-items-center bg-muted text-primary transition-colors duration-200"
              >
                <f.icon className="h-5 w-5" />
              </motion.span>

              <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{f.title}</h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Two-Column Problem/Solution Block */}
      <section className="site-container py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-b border-border py-16">
          {/* Problem Column */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {siteContent.homepage.comparison.chaos.label}
            </span>
            <h3 className="font-display text-2xl font-bold tracking-tight text-foreground leading-none">
              {siteContent.homepage.comparison.chaos.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              {siteContent.homepage.comparison.chaos.desc}
            </p>
          </div>
          {/* Solution Column */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              {siteContent.homepage.comparison.blueprint.label}
            </span>
            <h3 className="font-display text-2xl font-bold tracking-tight text-foreground leading-none">
              {siteContent.homepage.comparison.blueprint.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              {siteContent.homepage.comparison.blueprint.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Block */}
      <section className="site-container py-16 sm:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-border">
          {siteContent.homepage.metrics.map((m) => (
            <div
              key={m.label}
              className="border-r border-b border-border p-8 flex flex-col justify-center items-center text-center hover:bg-muted/30 transition-colors"
            >
              <span
                className={`font-display text-4xl md:text-5xl font-extrabold mb-2 ${m.highlight ? "text-primary" : "text-foreground"}`}
              >
                {m.value}
              </span>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Code / API Section */}
      <section className="site-container py-16 sm:py-24">
        <div className="bg-zinc-950 dark:bg-card text-zinc-50 dark:text-foreground rounded-none p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-border shadow-sm">
          <div className="flex-1">
            <span className="text-xs font-mono text-primary uppercase tracking-widest mb-4 block">
              {siteContent.homepage.developer.eyebrow}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-6 leading-none tracking-tighter text-zinc-50 dark:text-foreground">
              {siteContent.homepage.developer.title}
            </h2>
            <p className="text-zinc-400 dark:text-muted-foreground text-lg leading-relaxed mb-8">
              {siteContent.homepage.developer.desc}
            </p>
            <Button
              variant="secondary"
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90 text-white border-0"
            >
              <Link href={siteContent.homepage.developer.cta.href}>
                {siteContent.homepage.developer.cta.text}
              </Link>
            </Button>
          </div>
          <div className="flex-1 w-full bg-white dark:bg-[#1e1e1e] rounded-xl border border-black/10 dark:border-white/10 font-mono text-sm text-zinc-800 dark:text-white/80 overflow-hidden shadow-2xl relative transition-colors duration-200">
            <div className="flex items-center px-4 py-3 bg-zinc-100 dark:bg-[#2d2d2d] border-b border-black/5 dark:border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="leading-loose">
                <code className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {siteContent.homepage.developer.codeSnippet.method}
                </code>{" "}
                <span className="text-zinc-500 dark:text-white/60">
                  {siteContent.homepage.developer.codeSnippet.path}
                </span>
                <br />
                <span className="text-primary">{`{`}</span>
                <br />
                {`  `} <span className="text-zinc-900 dark:text-white/90">"scenario"</span>:{" "}
                <span className="text-emerald-600 dark:text-emerald-300">
                  "{siteContent.homepage.developer.codeSnippet.scenario}"
                </span>
                ,<br />
                {`  `} <span className="text-zinc-900 dark:text-white/90">"variables"</span>: {`{`}
                <br />
                {`    `} <span className="text-zinc-900 dark:text-white/90">"mrr_growth_rate"</span>
                :{" "}
                <span className="text-amber-600 dark:text-amber-300">
                  {siteContent.homepage.developer.codeSnippet.mrrGrowth}
                </span>
                ,<br />
                {`    `} <span className="text-zinc-900 dark:text-white/90">"churn_impact"</span>:{" "}
                <span className="text-amber-600 dark:text-amber-300">
                  {siteContent.homepage.developer.codeSnippet.churnImpact}
                </span>
                <br />
                {`  `}
                {`}`}
                <br />
                <span className="text-primary">{`}`}</span>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Block */}
      <section className="site-container py-16 sm:py-24">
        <SectionHeading eyebrow="Field Reports" title="What Builders Say" />
        <div className="mt-16 flex justify-center">
          <div className="relative h-[min(420px,70vh)] sm:h-[500px] w-full max-w-4xl overflow-hidden border-t border-b border-border [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 35,
              }}
              className="flex flex-col gap-24 pt-12"
            >
              {siteContent.homepage.testimonials.list
                .concat(siteContent.homepage.testimonials.list)
                .map((t, i) => (
                  <div key={i} className="flex flex-col items-center text-center px-4">
                    <Quote className="w-8 h-8 text-primary opacity-30 mb-6" />
                    <h3 className="font-display text-2xl md:text-4xl font-medium leading-tight mb-8 text-foreground/90">
                      "{t.quote}"
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground border border-border text-lg">
                        {t.initial}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-base">{t.author}</span>
                        <span className="text-xs text-primary font-mono uppercase tracking-widest">
                          {t.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
      <div className="max-w-3xl">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary font-mono mb-4"
        >
          // {eyebrow}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl font-extrabold sm:text-5xl tracking-tighter leading-none"
        >
          {title}
        </motion.h2>
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-sm text-muted-foreground text-sm leading-relaxed border-l-2 border-primary pl-4 md:text-right md:border-l-0 md:border-r-2 md:pr-4 md:pl-0"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
