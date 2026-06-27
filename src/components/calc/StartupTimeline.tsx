"use client";

import React from "react";
import { CheckCircle2, Circle, Milestone } from "lucide-react";
import { CalculatorInputs, CostResult, formatMoney, type Currency } from "@/lib/pricing";

interface StartupTimelineProps {
  inputs: CalculatorInputs;
  results: CostResult;
  currencySymbol: string;
  activeCurrency: Currency;
}

interface TimelineMilestone {
  id: string;
  label: string;
  conditionLabel: string;
  checkReached: (inputs: CalculatorInputs, results: CostResult) => boolean;
  advice: string;
}

const MILESTONES: TimelineMilestone[] = [
  {
    id: "paying-customer",
    label: "First Paying Customer",
    conditionLabel: "Paying customers > 0",
    checkReached: (i) => i.payingCustomers >= 1,
    advice:
      "Validate value proposition, set up clean payment processing links, and collect feedback.",
  },
  {
    id: "100-customers",
    label: "100 Paying Customers",
    conditionLabel: "Paying customers >= 100",
    checkReached: (i) => i.payingCustomers >= 100,
    advice:
      "Find scalable distribution channels, smooth onboarding UX, and stabilize cloud infrastructure.",
  },
  {
    id: "break-even",
    label: "Break-even Point",
    conditionLabel: "Monthly Revenue > Monthly Expenses",
    checkReached: (_i, r) => r.netProfit >= 0,
    advice:
      "Achieved when MRR covers employee payroll, server hosting, and marketing budgets. Focus on expansion pricing.",
  },
  {
    id: "10k-mrr",
    label: "$10K MRR Threshold",
    conditionLabel: "MRR >= $10,000",
    checkReached: (_i, r) => r.metrics.mrr >= 10000,
    advice:
      "Transition to team expansion, setup solid customer CRM pipelines, and reduce support drag.",
  },
  {
    id: "50k-mrr",
    label: "$50K MRR Threshold",
    conditionLabel: "MRR >= $50,000",
    checkReached: (_i, r) => r.metrics.mrr >= 50000,
    advice:
      "Establish corporate account pricing tiers, hire middle management, and optimize database read caching.",
  },
  {
    id: "100k-mrr",
    label: "$100K MRR Threshold",
    conditionLabel: "MRR >= $10,0000",
    checkReached: (_i, r) => r.metrics.mrr >= 100000,
    advice:
      "Enterprise scale. Set up automated SOC2 security reporting, dedicated account support managers, and international currency checkouts.",
  },
  {
    id: "1m-arr",
    label: "$1M ARR Milestone",
    conditionLabel: "ARR >= $1,000,000",
    checkReached: (_i, r) => r.metrics.arr >= 1000000,
    advice: "Elite startup scale. Fully scalable CAC engine, highly stable retention cohorts.",
  },
  {
    id: "series-a-ready",
    label: "Series A Ready",
    conditionLabel: "Health Score >= 80 & LTV:CAC >= 4x",
    checkReached: (_i, r) => r.healthScore >= 80 && r.metrics.ltvToCac >= 4,
    advice:
      "Ready for venture capital expansion. Investors value low churn, fast payback periods, and high capital efficiency.",
  },
  {
    id: "global-expansion",
    label: "Global Expansion",
    conditionLabel: "Team Members >= 10 & API requests >= 50M",
    checkReached: (i) => i.teamMembers >= 10 && i.apiRequests >= 50000000,
    advice:
      "Setup multi-region server distributions, localize marketing content, and configure local tax operations.",
  },
];

export function StartupTimeline({
  inputs,
  results,
  currencySymbol: _,
  activeCurrency,
}: StartupTimelineProps) {
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 border border-border/80 bg-aura">
        <h3 className="font-display text-base font-bold flex items-center gap-2 text-foreground">
          <Milestone className="h-5 w-5 text-primary" /> Interactive Startup Milestone Timeline
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Track milestones completed based on your current inputs. Projections update live as
          sliders adjust.
        </p>
      </div>

      <div className="relative border-l border-border/70 ml-4 pl-6 space-y-6 py-2">
        {MILESTONES.map((milestone) => {
          const reached = milestone.checkReached(inputs, results);
          return (
            <div key={milestone.id} className="relative group">
              {/* Connector Pin */}
              <div className="absolute -left-[31px] top-1.5 z-10 flex items-center justify-center">
                {reached ? (
                  <span className="bg-emerald-500 text-emerald-foreground rounded-full p-0.5 border border-background">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-300" />
                  </span>
                ) : (
                  <span className="bg-secondary text-muted-foreground rounded-full p-0.5 border border-border">
                    <Circle className="h-4.5 w-4.5" />
                  </span>
                )}
              </div>

              {/* Milestone Details Card */}
              <div
                className={`glass rounded-2xl p-5 border transition duration-200 ${
                  reached
                    ? "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/30"
                    : "bg-card border-border/60 hover:border-primary/20"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4
                    className={`text-sm font-bold flex items-center gap-1.5 ${
                      reached ? "text-emerald-400" : "text-foreground"
                    }`}
                  >
                    {milestone.label}
                    {reached && (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/15">
                        Achieved
                      </span>
                    )}
                  </h4>
                  <span className="text-[10px] text-muted-foreground font-mono bg-secondary px-2 py-0.5 rounded border border-border/50">
                    Rule: {milestone.conditionLabel}
                  </span>
                </div>

                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {milestone.advice}
                </p>

                {/* Status KPI snapshot inside timeline cards */}
                <div className="mt-3 flex gap-4 text-[10px] border-t border-border/40 pt-3">
                  <div>
                    <span className="text-muted-foreground block">Active Paying Customers:</span>
                    <strong className="text-foreground">{inputs.payingCustomers}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Active MRR:</span>
                    <strong className="text-foreground">
                      {formatMoney(results.metrics.mrr, activeCurrency)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Net Profit:</span>
                    <strong
                      className={
                        results.netProfit >= 0
                          ? "text-emerald-400 font-bold"
                          : "text-rose-400 font-bold"
                      }
                    >
                      {formatMoney(results.netProfit, activeCurrency)}/mo
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
