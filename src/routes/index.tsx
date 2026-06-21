import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator as CalcIcon,
  PieChart,
  Sliders,
  FileDown,
  Sparkles,
  Gauge,
  Globe,
  Star,
  Plus,
  Rocket,
  CalendarCheck,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/Navbar";
import { Calculator } from "@/components/calc/Calculator";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { DEFAULT_INPUTS, type CalculatorInputs, type CurrencyCode } from "@/lib/pricing";
import heroImg from "@/assets/hero-dashboard.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SaaS Pricing & Cost Calculator — Clykur" },
      {
        name: "description",
        content:
          "Free SaaS pricing & cost calculator. Estimate monthly costs, gross margins, break-even and recommended pricing plans in real time. Built by Clykur.",
      },
      { property: "og:title", content: "SaaS Pricing & Cost Calculator — Clykur" },
      {
        property: "og:description",
        content: "Estimate SaaS costs, margins, break-even and recommended pricing plans in real time.",
      },
    ],
  }),
  component: Index,
});

const FEATURES = [
  { icon: CalcIcon, title: "Real cost modeling", desc: "Hosting, database, storage, email, SMS, payments & more with realistic 2025 pricing." },
  { icon: Sliders, title: "Interactive sliders", desc: "Drag to model users, API calls, emails, SMS and storage — instant recalculation." },
  { icon: PieChart, title: "Visual analytics", desc: "Cost breakdown, revenue vs cost and 12-month growth projections with live charts." },
  { icon: Sparkles, title: "AI pricing engine", desc: "Smart, tailored recommendations to lift margin and design competitive tiers." },
  { icon: Gauge, title: "SaaS health score", desc: "A single 0–100 score grading your unit economics against industry benchmarks." },
  { icon: Globe, title: "Multi-currency", desc: "Switch between USD, INR and EUR. Save calculations locally and share links." },
];

const TESTIMONIALS = [
  { quote: "Nailed our pricing tiers in an afternoon. The margin breakdown alone paid for itself.", name: "Aanya Rao", role: "Founder, LedgerOS" },
  { quote: "Finally a calculator that uses real infra costs. The health score is brutally honest — love it.", name: "Marcus Feld", role: "CTO, Shipline" },
  { quote: "We used the projections to raise our seed round. Investors loved the clean unit economics.", name: "Priya Nair", role: "CEO, Bloomstack" },
];

const FAQS = [
  { q: "How accurate are the cost estimates?", a: "We use realistic, current market rates for Vercel/AWS hosting, Supabase/Postgres, object storage, CDN, Resend email, Twilio/2Factor SMS, Razorpay payments, analytics and monitoring. Treat results as a strong directional estimate to inform pricing decisions." },
  { q: "Does it support Indian SaaS pricing?", a: "Yes. Switch the currency to INR and the calculator converts costs and pricing using up-to-date rates, including Razorpay-style ~2% payment processing." },
  { q: "Is my data stored anywhere?", a: "No. Everything runs in your browser and is saved to your local storage only. Share links encode inputs in the URL — nothing is sent to a server." },
  { q: "How are the recommended plans generated?", a: "The engine derives ARPU from your inputs, then builds Starter, Growth and Business tiers with sensible seat limits and feature sets, estimating revenue, profit and margin for each." },
  { q: "Can Clykur help me build my SaaS?", a: "Absolutely — that's what we do. Clykur helps founders design, build and launch scalable products. Book a consultation below." },
];

function Index() {
  const [inputs, setInputs] = useLocalStorage<CalculatorInputs>("clykur-inputs", DEFAULT_INPUTS);
  const [currencyCode, setCurrencyCode] = useLocalStorage<CurrencyCode>("clykur-currency", "USD");

  // Hydrate from share-link params once.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (![...p.keys()].length) return;
    const next: Partial<CalculatorInputs> = {};
    (Object.keys(DEFAULT_INPUTS) as (keyof CalculatorInputs)[]).forEach((k) => {
      const v = p.get(k);
      if (v != null && !Number.isNaN(Number(v))) next[k] = Number(v);
    });
    if (Object.keys(next).length) setInputs((prev) => ({ ...prev, ...next }));
    const cur = p.get("cur");
    if (cur === "USD" || cur === "INR" || cur === "EUR") setCurrencyCode(cur);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Toaster position="top-center" richColors />

      {/* Hero */}
      <section className="relative bg-aura">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pt-40">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Free SaaS pricing & cost calculator
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mt-5 font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl"
              >
                Price your SaaS with <span className="text-gradient">confidence</span>.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-5 max-w-lg text-lg text-muted-foreground"
              >
                Estimate real monthly costs, gross margins and break-even — then get AI-recommended
                pricing plans tuned to your numbers. In seconds.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Button variant="hero" size="lg" asChild>
                  <a href="#calculator">
                    Launch calculator <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="glass" size="lg" asChild>
                  <a href="#features">See features</a>
                </Button>
              </motion.div>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                <span><strong className="text-foreground">3</strong> currencies</span>
                <span><strong className="text-foreground">9</strong> cost drivers</span>
                <span><strong className="text-foreground">0–100</strong> health score</span>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[2rem] bg-primary/15 blur-3xl" aria-hidden />
              <img
                src={heroImg}
                alt="SaaS pricing analytics dashboard with cost breakdown charts"
                width={1280}
                height={960}
                className="relative w-full rounded-3xl border border-border shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Everything you need"
          title="Built for founders who care about margins"
          subtitle="A complete pricing toolkit — from raw infrastructure costs to investor-ready projections."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="relative scroll-mt-24 bg-aura">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="The calculator"
            title="Model your costs in real time"
            subtitle="Adjust the sliders and watch costs, margins, charts and pricing plans update instantly."
          />
          <div className="mt-12">
            <Calculator
              inputs={inputs}
              setInputs={setInputs}
              currencyCode={currencyCode}
              setCurrencyCode={setCurrencyCode}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Loved by founders" title="Trusted by SaaS builders" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass flex flex-col rounded-2xl p-6"
            >
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm text-muted-foreground">"{t.quote}"</blockquote>
              <figcaption className="mt-5">
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="glass mb-3 rounded-xl border-0 px-5">
              <AccordionTrigger className="text-left font-display text-base hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Lead gen CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center sm:p-16"
        >
          <div className="absolute inset-0 bg-aura opacity-80" aria-hidden />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
              <Rocket className="h-3.5 w-3.5" /> Want help building this SaaS?
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold sm:text-4xl">
              Clykur helps founders design, build, and launch scalable products.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              From pricing strategy to a production-ready app — we partner with you end to end.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="hero" size="lg" asChild>
                <a href="mailto:hello@clykur.com?subject=Consultation%20request">
                  <CalendarCheck className="h-4 w-4" /> Book consultation
                </a>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <a href="mailto:hello@clykur.com">Contact Clykur</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border print:hidden">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-display font-bold text-foreground">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
              <CalcIcon className="h-3.5 w-3.5" />
            </span>
            Clykur
          </div>
          <p>© {new Date().getFullYear()} Clykur. SaaS pricing, cost & profit calculator.</p>
        </div>
      </footer>
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
    <div className="mx-auto max-w-2xl text-center">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-primary"
      >
        <Plus className="h-3.5 w-3.5" /> {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-3 font-display text-3xl font-bold sm:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
