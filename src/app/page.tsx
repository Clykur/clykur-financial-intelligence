"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator as CalcIcon,
  PieChart,
  Sliders,
  Sparkles,
  Gauge,
  Globe,
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
import { CommandPalette } from "@/components/site/CommandPalette";
import { LandingPages } from "@/components/site/LandingPages";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { DEFAULT_INPUTS, type CalculatorInputs, type CurrencyCode } from "@/lib/pricing";

import heroImg from "@/assets/hero-dashboard.jpg";
import logo from "@/app/icon.png";

const FEATURES = [
  {
    icon: CalcIcon,
    title: "AI Financial Modeling",
    desc: "Model pricing, revenue, expenses, runway, and profitability with real-time calculations built for modern SaaS businesses.",
  },
  {
    icon: Sliders,
    title: "What-If Scenario Simulator",
    desc: "Instantly evaluate pricing changes, user growth, churn, payroll, infrastructure, and acquisition costs with interactive simulations.",
  },
  {
    icon: PieChart,
    title: "Forecasting & Analytics",
    desc: "Visualize revenue growth, cash runway, burn rate, gross margins, and financial trends through interactive dashboards.",
  },
  {
    icon: Sparkles,
    title: "AI Financial Advisor",
    desc: "Receive intelligent recommendations to improve pricing, margins, customer economics, runway, and overall business performance.",
  },
  {
    icon: Gauge,
    title: "SaaS Health Score",
    desc: "Measure your company's financial health using key metrics like MRR growth, LTV:CAC, churn, Rule of 40, and profitability.",
  },
  {
    icon: Globe,
    title: "Cloud Cost Intelligence",
    desc: "Compare AWS, Google Cloud, Azure, Vercel, Supabase, Cloudflare, Neon, and more to identify the most cost-efficient infrastructure.",
  },
];

const FAQS = [
  {
    q: "What is Clykur SaaS Financial Intelligence Platform?",
    a: "Clykur is an AI-powered SaaS Financial Intelligence Platform that helps founders plan pricing, forecast revenue, optimize cloud costs, analyze unit economics, and make data-driven financial decisions from a single workspace.",
  },
  {
    q: "Who should use this platform?",
    a: "This platform is built for SaaS founders, startups, product teams, agencies, consultants, accelerators, and investors who want to model growth, improve profitability, and make better financial decisions.",
  },
  {
    q: "What financial metrics can I analyze?",
    a: "Analyze MRR, ARR, LTV, CAC, LTV:CAC, churn, gross margins, burn rate, runway, Rule of 40, profitability, cloud infrastructure costs, and long-term revenue projections in real time.",
  },
  {
    q: "How does the AI Financial Advisor help?",
    a: "The AI Financial Advisor evaluates your business metrics and provides intelligent recommendations to improve pricing, increase margins, reduce cloud spending, extend runway, and strengthen overall SaaS performance.",
  },
  {
    q: "Do I need an account to use this platform?",
    a: "No. Most calculators, financial models, simulations, and AI insights are available instantly without creating an account. Sign in only if you want to save, manage, or share your scenarios.",
  },
  {
    q: "Can I share reports and financial scenarios?",
    a: "Yes. Generate secure shareable links and professional PDF reports that can be shared with co-founders, clients, investors, or stakeholders while preserving all calculations and insights.",
  },
];

export default function IndexPage() {
  const [, setInputs] = useLocalStorage<CalculatorInputs>("saas-inputs-2026", DEFAULT_INPUTS);
  const [, setCurrencyCode] = useLocalStorage<CurrencyCode>("saas-currency-2026", "USD");
  const [seoCalculatorType, setSeoCalculatorType] = useState<string>("suite");

  // Hydrate states and merge default values to prevent local storage schema mismatches
  useEffect(() => {
    setInputs((prev) => ({ ...DEFAULT_INPUTS, ...prev }));
  }, [setInputs]);

  const handleSimulate = (type: string) => {
    switch (type) {
      case "double-users":
        setInputs((prev) => ({
          ...prev,
          mau: prev.mau * 2,
          payingCustomers: prev.payingCustomers * 2,
          apiRequests: prev.apiRequests * 1.8,
        }));
        break;
      case "10x-traffic":
        setInputs((prev) => ({
          ...prev,
          apiRequests: prev.apiRequests * 10,
        }));
        break;
      case "price-increase":
        setInputs((prev) => ({
          ...prev,
          arpu: Math.round(prev.arpu * 1.25),
        }));
        break;
      case "annual-billing":
        setInputs((prev) => ({
          ...prev,
          annualBillingAdoption: 75,
        }));
        break;
      case "reduce-churn":
        setInputs((prev) => ({
          ...prev,
          churnRate: Math.max(0.5, prev.churnRate * 0.5),
        }));
        break;
      default:
        break;
    }
  };

  return (
    <div
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-300"
    >
      <Navbar />
      <Toaster position="top-center" richColors />

      {/* Command Palette Keyboard Shortcut Listener */}
      <CommandPalette
        onLoadTemplate={(newInputs) => setInputs(newInputs)}
        onSimulate={handleSimulate}
        onSwitchCurrency={(cur) => setCurrencyCode(cur)}
      />

      {/* Hero Header */}
      <section id="Top" className="relative bg-aura">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-[90vw] px-4 pb-16 pt-32 sm:px-6 sm:pt-40">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mt-5 font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl"
              >
                The SaaS Financial Intelligence <span className="text-gradient">Platform.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-5 max-w-lg text-lg text-muted-foreground"
              >
                Plan pricing, forecast growth, optimize cloud costs, analyze unit economics, and
                make smarter financial decisions with AI.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Button variant="hero" size="lg" asChild>
                  <a href="/dashboard">
                    Start Planning <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="glass" size="lg" asChild>
                  <a href="#seo-tools">SEO Calculators</a>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div
                className="absolute -inset-6 rounded-[2rem] bg-primary/15 blur-3xl"
                aria-hidden
              />
              <Image
                src={heroImg}
                alt="SaaS pricing analytics dashboard with cost breakdown charts"
                width={1280}
                height={960}
                priority
                className="relative w-full rounded-3xl border border-border shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Overview Grid */}
      <section id="features" className="mx-auto max-w-[90vw] px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Intelligence Platform"
          title="Engineered for Software Builders"
          subtitle="Real server cost projections, SaaS economics, and automated advisor insights."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
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
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: {
                  duration: 0.2,
                },
              }}
              className="group glass rounded-2xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
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
                className="group grid h-12 w-12 place-items-center rounded-xl text-primary transition-all duration-300 hover:bg-gradient-to-br hover:from-primary hover:to-primary-glow hover:text-white"
              >
                <f.icon className="h-5 w-5" />
              </motion.span>

              <h3 className="mt-5 font-display text-xl font-semibold">{f.title}</h3>

              <p className="mt-3 leading-7 text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEO Calculator Simulator */}
      <section
        id="seo-tools"
        className="mx-auto max-w-[90vw] px-4 py-20 sm:px-6 border-b border-border/50"
      >
        <SectionHeading
          eyebrow="SEO Calculators"
          title="Search-Engine Indexable Landing Layouts"
          subtitle="Quickly toggle presets below to inspect dynamic index configurations."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            variant={seoCalculatorType === "mrr" ? "hero" : "outline"}
            size="sm"
            onClick={() => setSeoCalculatorType("mrr")}
          >
            MRR Calculator
          </Button>
          <Button
            variant={seoCalculatorType === "runway" ? "hero" : "outline"}
            size="sm"
            onClick={() => setSeoCalculatorType("runway")}
          >
            Runway Calculator
          </Button>
          <Button
            variant={seoCalculatorType === "ltv" ? "hero" : "outline"}
            size="sm"
            onClick={() => setSeoCalculatorType("ltv")}
          >
            LTV Calculator
          </Button>
          <Button
            variant={seoCalculatorType === "suite" ? "hero" : "outline"}
            size="sm"
            onClick={() => setSeoCalculatorType("suite")}
          >
            Unit Economics Suite
          </Button>
        </div>

        <LandingPages
          type={seoCalculatorType}
          onApplyPreset={(newInputs) => setInputs(newInputs)}
        />
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-[50vw] scroll-mt-24 px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Frequently Answered Questions" />
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

      {/* Footer */}
      <footer className="border-t border-border print:hidden">
        <div className="mx-auto flex max-w-[90vw] flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 font-display text-xl font-black tracking-tight text-foreground"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-transparent hover:bg-primary/10 transition-colors text-primary-foreground">
              <Image src={logo} alt="logo" width={40} height={40} />
            </span>

            <div className="flex flex-col leading-none">
              <span className="text-primary font-display text-xl font-black tracking-tight">
                Clykur
              </span>
              <span className="hidden text-xs font-medium text-muted-foreground lg:block">
                SaaS Financial Intelligence Platform
              </span>
            </div>
          </Link>
          <p>© {new Date().getFullYear()} Clykur Financial OS. Built for SaaS Founders.</p>
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
        {eyebrow}
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
