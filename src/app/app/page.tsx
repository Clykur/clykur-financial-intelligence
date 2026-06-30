"use client";

import React, { useEffect, useState } from "react";
import { CommandPalette } from "@/components/site/CommandPalette";
import { LandingPages } from "@/components/site/LandingPages";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { DEFAULT_INPUTS, type CalculatorInputs, type CurrencyCode } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/site-content";

export default function AppPage() {
  const { hero, modules, defaultModule } = siteContent.app;
  const [, setInputs] = useLocalStorage<CalculatorInputs>("saas-inputs-2026", DEFAULT_INPUTS);
  const [, setCurrencyCode] = useLocalStorage<CurrencyCode>("saas-currency-2026", "USD");
  const [seoCalculatorType, setSeoCalculatorType, tabLoaded] = useLocalStorage<string>(
    "active-calculator-tab",
    defaultModule,
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (tabLoaded) setIsMounted(true);
  }, [tabLoaded]);

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

  if (!isMounted) {
    return (
      <div className="relative min-h-screen bg-background text-foreground site-page-pad">
        <section className="site-container animate-pulse space-y-6 py-16 sm:py-24">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="h-16 max-w-2xl rounded bg-muted" />
          <div className="h-6 max-w-xl rounded bg-muted" />
        </section>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground site-page-pad">
      <CommandPalette
        onLoadTemplate={(newInputs) => setInputs(newInputs)}
        onSimulate={handleSimulate}
        onSwitchCurrency={(cur) => setCurrencyCode(cur)}
      />

      <section className="site-container py-16 sm:py-24">
        <div className="mb-12 sm:mb-24">
          <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
            // {hero.eyebrow}
          </span>
          <h1 className="site-hero-title mb-6 sm:mb-8">
            {hero.titleLine1}
            <br />
            {hero.titleLine2}
          </h1>
          <p className="mt-2 text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {hero.subtitle}
          </p>
        </div>

        <div className="mb-12 flex flex-wrap gap-2 sm:gap-4 border-b border-border pb-8">
          {modules.map((mod) => (
            <Button
              key={mod.key}
              variant={seoCalculatorType === mod.key ? "hero" : "outline"}
              className="min-w-[calc(50%-0.25rem)] flex-1 rounded-none px-3 py-4 font-mono text-[10px] uppercase tracking-widest sm:min-w-0 sm:flex-none sm:px-6 sm:py-6 sm:text-xs"
              onClick={() => setSeoCalculatorType(mod.key)}
            >
              {mod.label}
            </Button>
          ))}
        </div>

        <div className="border border-border p-0 md:p-8 bg-background relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary/20"></div>
          <LandingPages
            type={seoCalculatorType}
            onApplyPreset={(newInputs) => setInputs(newInputs)}
          />
        </div>
      </section>
    </div>
  );
}
