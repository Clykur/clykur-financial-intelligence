"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Dashboard } from "@/components/calc/Dashboard";
import { DashboardSkeleton } from "@/components/calc/DashboardSkeleton";
import { Navbar } from "@/components/site/Navbar";
import { CommandPalette } from "@/components/site/CommandPalette";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  DEFAULT_INPUTS,
  type CalculatorInputs,
  type CurrencyCode,
  type CloudProvider,
  type TargetMarket,
} from "@/lib/pricing";
import { Toaster } from "@/components/ui/sonner";

function DashboardContent() {
  const searchParams = useSearchParams();
  const [inputs, setInputs, inputsLoaded] = useLocalStorage<CalculatorInputs>(
    "saas-inputs-2026",
    DEFAULT_INPUTS,
  );
  const [currencyCode, setCurrencyCode, currencyLoaded] = useLocalStorage<CurrencyCode>(
    "saas-currency-2026",
    "USD",
  );
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    // Check if query parameters exist to enable shared view mode
    const hasParams =
      searchParams.has("mau") || searchParams.has("payingCustomers") || searchParams.has("arpu");
    if (hasParams) {
      setIsReadOnly(true);
      const parsedInputs: Partial<CalculatorInputs> = {};

      // Parse numbers
      const numKeys: Array<keyof CalculatorInputs> = [
        "mau",
        "payingCustomers",
        "arpu",
        "startingCash",
        "apiRequests",
        "emails",
        "sms",
        "storageGb",
        "monthlyMarketing",
        "churnRate",
        "cac",
        "teamMembers",
        "annualBillingAdoption",
      ];
      numKeys.forEach((key) => {
        const val = searchParams.get(key);
        if (val !== null) {
          parsedInputs[key] = Number(val) as never;
        }
      });

      // Parse cloud provider
      const provider = searchParams.get("cloudProvider");
      if (provider) {
        parsedInputs.cloudProvider = provider as CloudProvider;
      }

      // Parse target market
      const targetMarket = searchParams.get("targetMarket");
      if (targetMarket) {
        parsedInputs.targetMarket = targetMarket as TargetMarket;
      }

      // Parse currency
      const curParam = searchParams.get("cur");
      if (curParam) {
        setCurrencyCode(curParam as CurrencyCode);
      }

      setInputs({
        ...DEFAULT_INPUTS,
        ...parsedInputs,
      });
    } else {
      setIsReadOnly(false);
      setInputs((prev) => ({ ...DEFAULT_INPUTS, ...prev }));
    }
  }, [searchParams, setInputs, setCurrencyCode]);

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
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <Toaster position="top-center" richColors />

      {/* Command Palette Keyboard Shortcut Listener */}
      <CommandPalette
        onLoadTemplate={(newInputs) => setInputs(newInputs)}
        onSimulate={handleSimulate}
        onSwitchCurrency={(cur) => setCurrencyCode(cur)}
      />

      <div className="pt-24 pb-16">
        {!inputsLoaded || !currencyLoaded ? (
          <DashboardSkeleton />
        ) : (
          <Dashboard
            inputs={inputs}
            setInputs={setInputs}
            currencyCode={currencyCode}
            setCurrencyCode={setCurrencyCode}
            isReadOnly={isReadOnly}
          />
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground font-medium animate-pulse">
            Loading financial intelligence dashboard...
          </p>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
