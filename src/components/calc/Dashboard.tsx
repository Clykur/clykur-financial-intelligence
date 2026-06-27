"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  DollarSign,
  Percent,
  Activity,
  Award,
  Zap,
  Sparkles,
  Download,
  Share2,
  CheckCircle,
  AlertTriangle,
  Info,
  Server,
  FileText,
  Target,
  Rocket,
  Flame,
  Users,
  AlertOctagon,
  TrendingDown,
  ChevronDown,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Dropdown } from "@/components/ui/dropdown";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { CfoAdvisor } from "./CfoAdvisor";
import { CompetitorIntelligence } from "./CompetitorIntelligence";
import { StartupTimeline } from "./StartupTimeline";
import {
  computeCosts,
  recommendPlans,
  generateAdvice,
  CURRENCIES,
  TEMPLATES,
  formatMoney,
  formatNumber,
  type CalculatorInputs,
  type CurrencyCode,
  type CloudProvider,
  type TargetMarket,
} from "@/lib/pricing";

interface DashboardProps {
  inputs: CalculatorInputs;
  setInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
  currencyCode: CurrencyCode;
  setCurrencyCode: (cur: CurrencyCode) => void;
  isReadOnly?: boolean;
}

export function Dashboard({
  inputs,
  setInputs,
  currencyCode,
  setCurrencyCode,
  isReadOnly = false,
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isTabChanging, setIsTabChanging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const currencyRef = React.useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    setIsTabChanging(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTabChanging(false);
    }, 280);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [scenarioName, setScenarioName] = useState("");
  const [savedScenarios, setSavedScenarios] = useState<
    Array<{ name: string; inputs: CalculatorInputs }>
  >([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // Prevent SSR issues with Recharts
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("saas-scenarios");
    if (saved) {
      try {
        setSavedScenarios(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const activeCurrency = CURRENCIES[currencyCode];
  const results = computeCosts(inputs);
  const recommendations = recommendPlans(inputs, results);
  const advice = generateAdvice(inputs, results);

  // Scenario Management
  const handleSaveScenario = () => {
    if (!scenarioName.trim()) {
      toast.error("Please enter a name for the scenario");
      return;
    }
    const updated = [...savedScenarios, { name: scenarioName.trim(), inputs: { ...inputs } }];
    setSavedScenarios(updated);
    localStorage.setItem("saas-scenarios", JSON.stringify(updated));
    setScenarioName("");
    toast.success(`Scenario "${scenarioName}" saved successfully`);
  };

  const handleLoadScenario = (sc: CalculatorInputs) => {
    setInputs(sc);
    toast.success("Loaded scenario inputs");
  };

  const handleDeleteScenario = (index: number) => {
    const updated = savedScenarios.filter((_, idx) => idx !== index);
    setSavedScenarios(updated);
    localStorage.setItem("saas-scenarios", JSON.stringify(updated));
    toast.info("Scenario deleted");
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([k, v]) => {
      params.set(k, String(v));
    });
    params.set("cur", currencyCode);
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied to clipboard!");
  };

  // What-if simulator presets
  const triggerPreset = (type: string) => {
    switch (type) {
      case "double-users":
        setInputs((prev) => ({
          ...prev,
          mau: prev.mau * 2,
          payingCustomers: prev.payingCustomers * 2,
          apiRequests: prev.apiRequests * 1.8,
        }));
        toast.success("Simulated: Users Doubled & Traffic Expanded");
        break;
      case "product-hunt":
        setInputs((prev) => ({
          ...prev,
          mau: prev.mau + 25000,
          payingCustomers: prev.payingCustomers + 450,
          apiRequests: prev.apiRequests * 3,
          startingCash: prev.startingCash - 2000, // launch campaign budget cost
        }));
        toast.success("Simulated: Successful Product Hunt Launch (+25K MAU, +450 Customers)");
        break;
      case "hacker-news":
        setInputs((prev) => ({
          ...prev,
          mau: prev.mau + 40000,
          payingCustomers: prev.payingCustomers + 150, // lower conversion rate but high traffic
          apiRequests: prev.apiRequests * 5,
        }));
        toast.success("Simulated: Hacker News Front Page (High Traffic Spike!)");
        break;
      case "hire-10-engineers":
        setInputs((prev) => ({
          ...prev,
          teamMembers: prev.teamMembers + 10,
          avgSalary: 9000,
        }));
        toast.success("Simulated: Scaled Team (Added 10 Software Engineers)");
        break;
      case "aws-outage":
        setInputs((prev) => ({
          ...prev,
          churnRate: Math.min(25, prev.churnRate + 4.5), // customers leave due to reliability issues
        }));
        toast.success("Simulated: 8-Hour AWS S3 Outage (Churn Spiked!)");
        break;
      case "economic-recession":
        setInputs((prev) => ({
          ...prev,
          churnRate: Math.min(25, prev.churnRate * 1.8),
          payingCustomers: Math.max(10, Math.round(prev.payingCustomers * 0.85)),
          monthlyMarketing: Math.round(prev.monthlyMarketing * 0.5), // slash ad budget
        }));
        toast.success("Simulated: Economic Recession (Slashed marketing, Churn spikes)");
        break;
      case "10x-traffic":
        setInputs((prev) => ({
          ...prev,
          apiRequests: prev.apiRequests * 10,
        }));
        toast.success("Simulated: 10x API Traffic");
        break;
      case "price-increase":
        setInputs((prev) => ({
          ...prev,
          arpu: Math.round(prev.arpu * 1.25),
        }));
        toast.success("Simulated: +25% Price Increase");
        break;
      case "annual-billing":
        setInputs((prev) => ({
          ...prev,
          annualBillingAdoption: 75,
        }));
        toast.success("Simulated: 75% Annual Billing Adoption");
        break;
      case "reduce-churn":
        setInputs((prev) => ({
          ...prev,
          churnRate: Math.max(0.5, prev.churnRate * 0.5),
        }));
        toast.success("Simulated: 50% Reduction in Customer Churn");
        break;
      case "expand-team":
        setInputs((prev) => ({
          ...prev,
          teamMembers: prev.teamMembers + 4,
          avgSalary: 8500,
        }));
        toast.success("Simulated: Added 4 Engineers to the Team");
        break;
      case "migrate-cloudflare":
        setInputs((prev) => ({
          ...prev,
          cloudProvider: "cloudflare-r2",
        }));
        toast.success("Simulated: Cloud Migrated to Cloudflare Edge");
        break;
      default:
        break;
    }
  };

  // Chart data formatting
  const getProjectedRunwayData = () => {
    const data = [];
    let cash = inputs.startingCash;
    const monthlyNet = results.netProfit;

    for (let month = 0; month <= 12; month++) {
      data.push({
        name: month === 0 ? "Now" : `M+${month}`,
        Cash: Math.max(0, Math.round(cash)),
      });
      cash += monthlyNet;
    }
    return data;
  };

  const getExpensesPieData = () => {
    return [
      {
        name: "Infrastructure",
        value: Math.round(results.infrastructure),
        color: "var(--color-chart-1)",
      },
      {
        name: "Services & APIs",
        value: Math.round(results.services),
        color: "var(--color-chart-2)",
      },
      {
        name: "Operations & Team",
        value: Math.round(results.operational),
        color: "var(--color-chart-3)",
      },
    ];
  };

  const getMonthlyForecastData = () => {
    const data = [];
    const rev = results.revenue;
    const exp = results.monthlyExpenses;

    for (let month = 1; month <= 12; month++) {
      // growth factor: compounding growth assuming churn rate & marketing CAC conversion
      const growthFactor = 1 + (results.metrics.magicNumber > 0.5 ? 0.08 : 0.03);
      const computedRev = rev * Math.pow(growthFactor, month);
      const computedExp = exp + (computedRev - rev) * 0.05; // marginal COGS increase
      data.push({
        name: `Month ${month}`,
        Revenue: Math.round(computedRev),
        Expenses: Math.round(computedExp),
        Profit: Math.round(computedRev - computedExp),
      });
    }
    return data;
  };

  // PDF Export Utility
  const handleExportPDF = async () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // 1. Brand Palette & Colors
      const primaryColor = [255, 83, 55]; // #ff5337
      const textColor = [20, 20, 28]; // Dark Slate

      // 2. Load Logo (Async fetch from /icon.png)
      let logoBase64 = "";
      try {
        const logoUrl = "/icon.png";
        const img = new Image();
        img.crossOrigin = "anonymous";
        await new Promise((resolve, reject) => {
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              logoBase64 = canvas.toDataURL("image/png");
              resolve(null);
            } else {
              reject();
            }
          };
          img.onerror = reject;
          img.src = logoUrl;
        });
      } catch (e) {
        console.warn("Could not load icon.png for PDF header", e);
      }

      // Header Drawing
      const logoSize = 12;
      let startY = 15;
      if (logoBase64) {
        doc.addImage(logoBase64, "PNG", 15, startY, logoSize, logoSize);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("Clykur", 30, startY + 9);
      } else {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("Clykur", 15, startY + 9);
      }

      // Title & Date
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      const today = new Date();
      const dateStr = today.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      doc.text(`Generated: ${dateStr}`, 130, startY + 5);
      doc.text(
        `Currency: ${CURRENCIES[currencyCode].code} (${CURRENCIES[currencyCode].symbol})`,
        130,
        startY + 10,
      );

      // Divider Line
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(0.8);
      doc.line(15, startY + 15, 195, startY + 15);

      // Section: Document Title
      startY += 24;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text("SaaS Financial Projections & Health Assessment Report", 15, startY);

      // Section: Executive Summary
      startY += 10;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("1. Executive Summary", 15, startY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(60, 60, 60);

      const summaryText = `This briefing analyzes the financial projections, cloud infrastructure components, pricing tier options, and SaaS unit economics modeled within Clykur. Currently, the company operates at a blended gross margin of ${results.grossMargin.toFixed(1)}% and generates monthly recurring revenue (MRR) of ${formatMoney(results.metrics.mrr, activeCurrency)} (${formatMoney(results.metrics.arr, activeCurrency)} ARR). With monthly operating expenses at ${formatMoney(results.monthlyExpenses, activeCurrency)}, the net monthly cash flow is ${results.netProfit >= 0 ? "+" : ""}${formatMoney(results.netProfit, activeCurrency)}. The cash runway is estimated at ${results.runwayMonths === 999 ? "Profitable" : `${results.runwayMonths.toFixed(1)} months`}, achieving a SaaS Health Score of ${results.healthScore.toFixed(0)}/100.`;

      const splitSummary = doc.splitTextToSize(summaryText, 180);
      doc.text(splitSummary, 15, startY + 5);

      startY += splitSummary.length * 5 + 8;

      // Section 2: Core Metrics Table
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("2. Key Financial & SaaS Metrics", 15, startY);

      const metricsRows = [
        [
          "Monthly Recurring Revenue (MRR)",
          formatMoney(results.metrics.mrr, activeCurrency),
          "Annual Recurring Revenue (ARR)",
          formatMoney(results.metrics.arr, activeCurrency),
        ],
        [
          "Gross Margin %",
          `${results.grossMargin.toFixed(1)}%`,
          "Rule of 40 Index",
          `${results.metrics.ruleOf40.toFixed(1)}%`,
        ],
        [
          "Monthly Expenses",
          formatMoney(results.monthlyExpenses, activeCurrency),
          "Net Monthly Cash Flow",
          formatMoney(results.netProfit, activeCurrency),
        ],
        [
          "Cash Runway Months",
          results.runwayMonths === 999
            ? "Profitable (999 Mo)"
            : `${results.runwayMonths.toFixed(1)} Months`,
          "SaaS Health Score Check",
          `${results.healthScore.toFixed(0)} / 100`,
        ],
        [
          "Customer Churn Rate",
          `${inputs.churnRate}%/mo`,
          "Customer Acquisition Cost (CAC)",
          formatMoney(results.metrics.cac, activeCurrency),
        ],
        [
          "Customer Lifetime Value (LTV)",
          formatMoney(results.metrics.ltv, activeCurrency),
          "LTV to CAC Multiplier",
          `${results.metrics.ltvToCac.toFixed(1)}x`,
        ],
      ];

      autoTable(doc, {
        startY: startY + 3,
        head: [["Financial Metric", "Value", "SaaS Metric", "Value"]],
        body: metricsRows,
        theme: "striped",
        headStyles: {
          fillColor: [255, 83, 55],
          textColor: [255, 255, 255],
          fontSize: 9.5,
          fontStyle: "bold",
        },
        bodyStyles: {
          fontSize: 9,
          textColor: [40, 40, 40],
        },
        margin: { left: 15, right: 15 },
      });

      // Section 3: AI CFO Advisor Recommendations
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lastTableY = (doc as any).lastAutoTable?.finalY || startY + 45;
      startY = lastTableY + 12;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("3. AI CFO Advisor Action Plan", 15, startY);

      // Get generated advice recommendations
      const advisorAdvice = generateAdvice(inputs, results);
      const adviceRows = advisorAdvice.map((adv) => {
        return [adv.category.toUpperCase(), adv.title + "\n" + adv.advice, adv.why];
      });

      autoTable(doc, {
        startY: startY + 3,
        head: [["Category", "Action Recommendation", "Expected Impact & Rationale"]],
        body: adviceRows,
        theme: "grid",
        headStyles: {
          fillColor: [30, 30, 44],
          textColor: [255, 255, 255],
          fontSize: 9.5,
          fontStyle: "bold",
        },
        bodyStyles: {
          fontSize: 8.5,
          textColor: [50, 50, 50],
        },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 80 },
          2: { cellWidth: 75 },
        },
        margin: { left: 15, right: 15 },
      });

      // Footer & Page Numbers
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.4);
        doc.line(15, 280, 195, 280);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(140, 140, 140);
        doc.text("© Clykur. All rights reserved.", 15, 285);
        doc.text(`Page ${i} of ${pageCount}`, 175, 285);
      }

      // Download trigger
      const dateIso = today.toISOString().split("T")[0];
      doc.save(`clykur-financial-report-${dateIso}.pdf`);
      toast.success("PDF Export Successfully Triggered!");
    } catch (error) {
      console.error("PDF Export Error", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  // Badges calculation
  const getBadges = () => {
    const badges = [];
    if (results.grossMargin >= 80) {
      badges.push({
        name: "Excellent Margins",
        desc: "COGS Margin is >80%",
        color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      });
    }
    if (results.runwayMonths === 999 || results.runwayMonths >= 18) {
      badges.push({
        name: "Investor Ready",
        desc: "Long runway or profitable operations",
        color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      });
    }
    if (results.costPerUser < 0.01) {
      badges.push({
        name: "Efficient Infrastructure",
        desc: "Infrastructure cost is <$0.01/user",
        color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      });
    }
    if (results.metrics.ltvToCac >= 4) {
      badges.push({
        name: "Healthy Growth",
        desc: "LTV:CAC is higher than 4x",
        color: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      });
    }
    if (results.healthScore < 50) {
      badges.push({
        name: "Needs Attention",
        desc: "Overall health score is below 50",
        color: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      });
    }
    return badges;
  };

  return (
    <div className="mx-auto max-w-[90vw] w-full px-4 py-8 sm:px-6 md:px-8 lg:px-12">
      {/* Workspace Dashboard Header */}
      <div className="mb-8 flex flex-col justify-between gap-6 border-b border-border pb-6 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Activity className="h-4 w-4" /> SaaS Financial Intelligence Suite
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Financial Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Evaluate unit economics, infrastructure costs, cash runway, and pricing tiers live.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Preset templates selector */}
          {!isReadOnly && (
            <div className="flex items-center gap-2">
              <Dropdown
                options={Object.entries(TEMPLATES).map(([key, item]) => ({
                  key,
                  label: item.label,
                }))}
                selectedKey={selectedTemplate}
                placeholder="Choose Industry..."
                onChange={(key) => {
                  setSelectedTemplate(key);

                  const preset = TEMPLATES[key];

                  if (preset) {
                    setInputs(preset.inputs);
                    toast.success(`Loaded ${preset.label} present assumptions`);
                  }
                }}
              />
            </div>
          )}

          {/* Currency Switcher Dropdown */}
          <div ref={currencyRef} className="relative inline-block text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Currency:</span>
              <button
                type="button"
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                title={`${CURRENCIES[currencyCode].name} (${CURRENCIES[currencyCode].country})`}
                className="inline-flex items-center justify-between gap-x-2 rounded-xl bg-secondary hover:bg-accent border border-border/80 px-3 py-1.5 text-xs font-semibold text-foreground transition-all focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer min-w-[210px] h-9"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-primary font-bold text-xs leading-none flex items-center justify-center h-4 w-4 bg-primary/10 rounded-sm">
                    {CURRENCIES[currencyCode].symbol}
                  </span>
                  <span className="font-mono text-[11px]">{CURRENCIES[currencyCode].code}</span>
                  <span className="text-muted-foreground font-normal text-[11px] truncate">
                    — {CURRENCIES[currencyCode].name} ({CURRENCIES[currencyCode].country})
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              </button>
            </div>

            {isCurrencyOpen && (
              <div className="absolute left-0 sm:right-0 sm:left-auto z-[999] mt-1.5 w-72 origin-top-right rounded-xl bg-card border border-border shadow-xl ring-1 ring-black/5 focus:outline-none max-h-72 overflow-y-auto">
                <div className="py-1">
                  {Object.entries(CURRENCIES).map(([code, cur]) => {
                    const isSelected = currencyCode === code;
                    return (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrencyCode(code as CurrencyCode);
                          setIsCurrencyOpen(false);
                        }}
                        title={`${cur.name} (${cur.country})`}
                        className={`flex w-full items-center justify-between px-3.5 py-2 text-left transition hover:bg-secondary cursor-pointer border-b border-border/20 last:border-b-0 ${isSelected
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-foreground font-normal"
                          }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isSelected
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground"
                              }`}
                          >
                            {cur.symbol}
                          </span>
                          <div className="flex flex-col truncate">
                            <span className="font-mono text-xs">{cur.code}</span>
                            <span className="text-[10px] text-muted-foreground truncate">
                              {cur.name} ({cur.country})
                            </span>
                          </div>
                        </div>
                        {isSelected && <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {!isReadOnly && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="h-9 rounded-full border border-border/80 bg-secondary px-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-accent hover:border-border/80 focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Link
            </Button>
          )}
        </div>
      </div>

      {/* Main Core Section */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Side: What-If Simulator & Inputs Panel (Span 4) */}
        <div className="lg:col-span-4 space-y-6 relative z-20">
          {isReadOnly ? (
            <div className="glass rounded-2xl p-6 border border-primary/20 bg-primary/5 space-y-3">
              <h3 className="font-display text-sm font-bold flex items-center gap-1.5 text-primary">
                <Info className="h-4 w-4" /> Read-Only Shared Scenario
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You are currently viewing a frozen financial configuration shared by a founder.
                Sliders and preset controls are locked. You can explore all tabs, AI CFO insights,
                timeline events, and graphs.
              </p>
              <Button size="sm" variant="hero" className="w-full font-bold mt-2" asChild>
                <a href="/dashboard">Create Your Own Scenario</a>
              </Button>
            </div>
          ) : (
            <>
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display text-lg font-bold flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" /> What If Simulator
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Alter drivers to immediately calculate your unit economics and projections.
                </p>

                {/* Quick Actions Buttons */}
                <div className="mt-4 grid grid-cols-2 gap-5">
                  <button
                    onClick={() => triggerPreset("product-hunt")}
                    className="rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground border border-border py-2 text-center text-xs font-medium flex items-center justify-center gap-1.5 transition"
                  >
                    <Rocket className="h-3.5 w-3.5 text-primary" /> Product Hunt
                  </button>
                  <button
                    onClick={() => triggerPreset("hacker-news")}
                    className="rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground border border-border py-2 text-center text-xs font-medium flex items-center justify-center gap-1.5 transition"
                  >
                    <Flame className="h-3.5 w-3.5 text-amber-500" /> Hacker News
                  </button>
                  <button
                    onClick={() => triggerPreset("hire-10-engineers")}
                    className="rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground border border-border py-2 text-center text-xs font-medium flex items-center justify-center gap-1.5 transition"
                  >
                    <Users className="h-3.5 w-3.5 text-blue-400" /> Hire 10 Eng
                  </button>
                  <button
                    onClick={() => triggerPreset("aws-outage")}
                    className="rounded-lg bg-secondary/80 text-rose-500 hover:bg-accent hover:text-accent-foreground border border-border py-2 text-center text-xs font-medium flex items-center justify-center gap-1.5 transition"
                  >
                    <AlertOctagon className="h-3.5 w-3.5 text-rose-400" /> AWS Outage
                  </button>
                  <button
                    onClick={() => triggerPreset("economic-recession")}
                    className="rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground border border-border py-2 text-center text-xs font-medium flex items-center justify-center gap-1.5 transition"
                  >
                    <TrendingDown className="h-3.5 w-3.5 text-rose-400" /> Recession
                  </button>
                  <button
                    onClick={() => triggerPreset("price-increase")}
                    className="rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground border border-border py-2 text-center text-xs font-medium transition"
                  >
                    Raise Price +25%
                  </button>
                </div>

                {/* Interactive Sliders Form */}
                <div className="mt-6 space-y-8">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium text-foreground">Active Users (MAU)</span>
                      <span className="text-muted-foreground">{formatNumber(inputs.mau)}</span>
                    </div>
                    <Slider
                      value={[inputs.mau]}
                      min={100}
                      max={500000}
                      step={100}
                      onValueChange={([v]) => setInputs((p) => ({ ...p, mau: v }))}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium text-foreground">Paying Customers</span>
                      <span className="text-muted-foreground">
                        {formatNumber(inputs.payingCustomers)} (
                        {((inputs.payingCustomers / Math.max(1, inputs.mau)) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <Slider
                      value={[inputs.payingCustomers]}
                      min={1}
                      max={Math.max(10, inputs.mau)}
                      step={5}
                      onValueChange={([v]) => setInputs((p) => ({ ...p, payingCustomers: v }))}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium text-foreground">ARPU (Average Price)</span>
                      <span className="text-muted-foreground">
                        {formatMoney(inputs.arpu, activeCurrency)}/mo
                      </span>
                    </div>
                    <Slider
                      value={[inputs.arpu]}
                      min={1}
                      max={2000}
                      step={1}
                      onValueChange={([v]) => setInputs((p) => ({ ...p, arpu: v }))}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium text-foreground">Monthly API Requests</span>
                      <span className="text-muted-foreground">
                        {formatNumber(inputs.apiRequests)}
                      </span>
                    </div>
                    <Slider
                      value={[inputs.apiRequests]}
                      min={10000}
                      max={100000000}
                      step={10000}
                      onValueChange={([v]) => setInputs((p) => ({ ...p, apiRequests: v }))}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium text-foreground">Monthly Email Dispatches</span>
                      <span className="text-muted-foreground">{formatNumber(inputs.emails)}</span>
                    </div>
                    <Slider
                      value={[inputs.emails]}
                      min={0}
                      max={1000000}
                      step={5000}
                      onValueChange={([v]) => setInputs((p) => ({ ...p, emails: v }))}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium text-foreground">Monthly SMS Dispatches</span>
                      <span className="text-muted-foreground">{formatNumber(inputs.sms)}</span>
                    </div>
                    <Slider
                      value={[inputs.sms]}
                      min={0}
                      max={100000}
                      step={500}
                      onValueChange={([v]) => setInputs((p) => ({ ...p, sms: v }))}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium text-foreground">Monthly Storage (GB)</span>
                      <span className="text-muted-foreground">
                        {formatNumber(inputs.storageGb)} GB
                      </span>
                    </div>
                    <Slider
                      value={[inputs.storageGb]}
                      min={1}
                      max={10000}
                      step={10}
                      onValueChange={([v]) => setInputs((p) => ({ ...p, storageGb: v }))}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium text-foreground">Monthly Marketing Budget</span>
                      <span className="text-muted-foreground">
                        {formatMoney(inputs.monthlyMarketing, activeCurrency)}/mo
                      </span>
                    </div>
                    <Slider
                      value={[inputs.monthlyMarketing]}
                      min={0}
                      max={50000}
                      step={250}
                      onValueChange={([v]) => setInputs((p) => ({ ...p, monthlyMarketing: v }))}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium text-foreground">Monthly Customer Churn %</span>
                      <span className="text-muted-foreground">{inputs.churnRate.toFixed(1)}%</span>
                    </div>
                    <Slider
                      value={[inputs.churnRate]}
                      min={0.1}
                      max={25}
                      step={0.1}
                      onValueChange={([v]) => setInputs((p) => ({ ...p, churnRate: v }))}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium text-foreground">
                        Customer Acquisition Cost (CAC)
                      </span>
                      <span className="text-muted-foreground">
                        {formatMoney(inputs.cac, activeCurrency)}
                      </span>
                    </div>
                    <Slider
                      value={[inputs.cac]}
                      min={1}
                      max={1000}
                      step={5}
                      onValueChange={([v]) => setInputs((p) => ({ ...p, cac: v }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label className="mb-2 text-xs font-medium text-muted-foreground">
                        Members
                      </label>

                      <input
                        type="number"
                        value={inputs.teamMembers}
                        onChange={(e) =>
                          setInputs((p) => ({
                            ...p,
                            teamMembers: Number(e.target.value),
                          }))
                        }
                        className="h-9 w-full rounded-full border border-border/80 bg-secondary px-3 text-sm font-medium text-foreground transition-all duration-200 outline-none hover:bg-accent focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="mb-2 text-xs font-medium text-muted-foreground">
                        Provider
                      </label>

                      <div className="h-10">
                        <Dropdown
                          options={[
                            { key: "vercel-supabase", label: "Supabase/Vercel" },
                            { key: "aws", label: "AWS" },
                            { key: "gcp", label: "Google Cloud" },
                            { key: "azure", label: "Azure" },
                            { key: "neon-railway", label: "Neon/Railway" },
                            { key: "cloudflare-r2", label: "Cloudflare/R2" },
                          ]}
                          selectedKey={inputs.cloudProvider}
                          onChange={(key) =>
                            setInputs((p) => ({
                              ...p,
                              cloudProvider: key as CloudProvider,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Side: Tab Contents & KPIs (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* SaaS Performance KPI Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="glass rounded-2xl p-5">
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <DollarSign className="h-3 w-3 text-emerald-400" /> MRR / ARR
              </div>
              <div className="mt-2 text-lg font-black tracking-tight sm:text-xl">
                {formatMoney(results.metrics.mrr, activeCurrency)}
              </div>
              <div className="text-[10px] text-muted-foreground font-semibold">
                ARR: {formatMoney(results.metrics.arr, activeCurrency)}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Percent className="h-3 w-3 text-purple-400" /> Gross Margin
              </div>
              <div className="mt-2 text-lg font-black tracking-tight sm:text-xl">
                {results.grossMargin.toFixed(1)}%
              </div>
              <div className="text-[10px] text-muted-foreground font-semibold">
                Net: {results.netMargin.toFixed(1)}%
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <TrendingUp className="h-3 w-3 text-sky-400" /> Runway & Burn
              </div>
              <div className="mt-2 text-lg font-black tracking-tight sm:text-xl">
                {results.runwayMonths === 999
                  ? "Infinite"
                  : `${results.runwayMonths.toFixed(1)} mo`}
              </div>
              <div className="text-[10px] text-muted-foreground font-semibold">
                Burn: {formatMoney(results.burnRate, activeCurrency)}/mo
              </div>
            </div>

            <div className="glass rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Award className="h-3 w-3 text-amber-400" /> Health Score
                </div>
                <div className="mt-2 text-2xl font-extrabold tracking-tight text-gradient">
                  {results.healthScore} <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
                <div className="text-[10px] font-semibold text-primary">
                  {results.healthScore > 80
                    ? "Grade: A (Elite)"
                    : results.healthScore > 65
                      ? "Grade: B (Healthy)"
                      : "Grade: C (Needs Tuning)"}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {getBadges().map((b) => (
                  <span
                    key={b.name}
                    title={b.desc}
                    className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${b.color}`}
                  >
                    {b.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Tabs (Pill filter style) */}
          <div className="flex flex-wrap gap-2 border-b border-border/30 pb-4 mb-6">
            <button
              onClick={() => handleTabChange("overview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${activeTab === "overview"
                ? "bg-primary text-primary-foreground border-primary/20 shadow-md shadow-primary/10"
                : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary border-border/30"
                }`}
            >
              <TrendingUp className="h-4 w-4" />
              Projections
            </button>
            <button
              onClick={() => handleTabChange("advisor")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${activeTab === "advisor"
                ? "bg-primary text-primary-foreground border-primary/20 shadow-md shadow-primary/10"
                : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary border-border/30"
                }`}
            >
              <Sparkles className="h-4 w-4" />
              AI CFO Chat
            </button>
            <button
              onClick={() => handleTabChange("pricing")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${activeTab === "pricing"
                ? "bg-primary text-primary-foreground border-primary/20 shadow-md shadow-primary/10"
                : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary border-border/30"
                }`}
            >
              <Target className="h-4 w-4" />
              Pricing Intel
            </button>
            <button
              onClick={() => handleTabChange("timeline")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${activeTab === "timeline"
                ? "bg-primary text-primary-foreground border-primary/20 shadow-md shadow-primary/10"
                : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary border-border/30"
                }`}
            >
              <Rocket className="h-4 w-4" />
              Timeline
            </button>
            <button
              onClick={() => handleTabChange("benchmarks")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${activeTab === "benchmarks"
                ? "bg-primary text-primary-foreground border-primary/20 shadow-md shadow-primary/10"
                : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary border-border/30"
                }`}
            >
              <Award className="h-4 w-4" />
              Benchmarks
            </button>
            <button
              onClick={() => handleTabChange("cloud")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${activeTab === "cloud"
                ? "bg-primary text-primary-foreground border-primary/20 shadow-md shadow-primary/10"
                : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary border-border/30"
                }`}
            >
              <Server className="h-4 w-4" />
              Cloud Costs
            </button>
            <button
              onClick={() => handleTabChange("investor")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${activeTab === "investor"
                ? "bg-primary text-primary-foreground border-primary/20 shadow-md shadow-primary/10"
                : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary border-border/30"
                }`}
            >
              <DollarSign className="h-4 w-4" />
              Investor Mode
            </button>
            <button
              onClick={() => handleTabChange("report")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${activeTab === "report"
                ? "bg-primary text-primary-foreground border-primary/20 shadow-md shadow-primary/10"
                : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary border-border/30"
                }`}
            >
              <FileText className="h-4 w-4" />
              Briefing & Reports
            </button>
          </div>

          {/* Tab Panel Content */}
          <div className="min-h-[400px]">
            {isTabChanging ? (
              <div className="glass rounded-2xl p-8 border border-border/80 space-y-6 animate-pulse min-h-[400px] flex flex-col justify-center items-center">
                <div className="relative flex items-center justify-center">
                  <div className="h-10 w-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <Sparkles className="h-4 w-4 text-amber-500 absolute animate-pulse" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-slate-100 text-sm">
                    Processing Scenario Projections
                  </h3>
                  <p className="text-xs text-muted-foreground">Running financial model logic...</p>
                </div>
              </div>
            ) : (
              <>
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* Advanced Charts Grid */}
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="glass rounded-2xl p-5">
                        <h3 className="text-sm font-bold mb-4 flex items-center justify-between">
                          <span>Cash Runway Projection (12 Months)</span>
                          <span className="text-[10px] text-muted-foreground">USD Base</span>
                        </h3>
                        <div className="h-64">
                          {mounted && (
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={getProjectedRunwayData()}>
                                <defs>
                                  <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                      offset="5%"
                                      stopColor="var(--color-primary)"
                                      stopOpacity={0.3}
                                    />
                                    <stop
                                      offset="95%"
                                      stopColor="var(--color-primary)"
                                      stopOpacity={0}
                                    />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  vertical={false}
                                  stroke="var(--color-border)"
                                />
                                <XAxis
                                  dataKey="name"
                                  stroke="var(--color-muted-foreground)"
                                  fontSize={11}
                                />
                                <YAxis
                                  stroke="var(--color-muted-foreground)"
                                  fontSize={11}
                                  tickFormatter={(v) => `$${formatNumber(v)}`}
                                />
                                <Tooltip
                                  contentStyle={{
                                    background: "var(--color-card)",
                                    borderColor: "var(--color-border)",
                                  }}
                                  formatter={(value) => [
                                    `$${value.toLocaleString()}`,
                                    "Cash Balance",
                                  ]}
                                />
                                <Area
                                  type="monotone"
                                  dataKey="Cash"
                                  stroke="var(--color-primary)"
                                  fillOpacity={1}
                                  fill="url(#colorCash)"
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      </div>

                      <div className="glass rounded-2xl p-5">
                        <h3 className="text-sm font-bold mb-4 flex items-center justify-between">
                          <span>12-Month Growth Projections</span>
                          <span className="text-[10px] text-muted-foreground">Revenue vs Burn</span>
                        </h3>
                        <div className="h-64">
                          {mounted && (
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={getMonthlyForecastData()}>
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  vertical={false}
                                  stroke="var(--color-border)"
                                />
                                <XAxis
                                  dataKey="name"
                                  stroke="var(--color-muted-foreground)"
                                  fontSize={11}
                                />
                                <YAxis
                                  stroke="var(--color-muted-foreground)"
                                  fontSize={11}
                                  tickFormatter={(v) => `$${formatNumber(v)}`}
                                />
                                <Tooltip
                                  contentStyle={{
                                    background: "var(--color-card)",
                                    borderColor: "var(--color-border)",
                                  }}
                                  formatter={(value) => [`$${value.toLocaleString()}`]}
                                />
                                <Legend fontSize={11} />
                                <Area
                                  type="monotone"
                                  dataKey="Revenue"
                                  stroke="var(--color-chart-2)"
                                  fillOpacity={0.15}
                                  fill="var(--color-chart-2)"
                                />
                                <Area
                                  type="monotone"
                                  dataKey="Expenses"
                                  stroke="var(--color-chart-5)"
                                  fillOpacity={0.05}
                                  fill="var(--color-chart-5)"
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expenses Breakdown List & Charts */}
                    <div className="glass rounded-2xl p-6">
                      <h3 className="text-sm font-bold mb-4">Expenses Category Allocation</h3>
                      <div className="grid gap-6 md:grid-cols-2 items-center">
                        <div className="h-56">
                          {mounted && (
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={getExpensesPieData()}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={80}
                                  paddingAngle={5}
                                  dataKey="value"
                                >
                                  {getExpensesPieData().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip
                                  contentStyle={{
                                    background: "var(--color-card)",
                                    borderColor: "var(--color-border)",
                                  }}
                                  formatter={(value) => [`$${value.toLocaleString()}/mo`]}
                                />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          )}
                        </div>

                        <div className="space-y-3.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />{" "}
                              Infrastructure COGS
                            </span>
                            <span className="font-bold">
                              {formatMoney(results.infrastructure, activeCurrency)}/mo
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />{" "}
                              Third-party APIs & Services
                            </span>
                            <span className="font-bold">
                              {formatMoney(results.services, activeCurrency)}/mo
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full bg-purple-400" />{" "}
                              Operational & Payroll
                            </span>
                            <span className="font-bold">
                              {formatMoney(results.operational, activeCurrency)}/mo
                            </span>
                          </div>
                          <div className="border-t border-border pt-3 flex justify-between items-center text-xs font-bold text-foreground">
                            <span>Total Monthly Burn</span>
                            <span>{formatMoney(results.monthlyExpenses, activeCurrency)}/mo</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SaaS Metrics Matrix */}
                    <div className="glass rounded-2xl p-6">
                      <h3 className="text-sm font-bold mb-4">SaaS Metrics Matrix</h3>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="bg-secondary/40 p-4 rounded-xl border border-border/50 text-center">
                          <div className="text-xs text-muted-foreground">LTV</div>
                          <div className="mt-1 text-base font-extrabold">
                            {formatMoney(results.metrics.ltv, activeCurrency)}
                          </div>
                        </div>
                        <div className="bg-secondary/40 p-4 rounded-xl border border-border/50 text-center">
                          <div className="text-xs text-muted-foreground">CAC Payback</div>
                          <div className="mt-1 text-base font-extrabold">
                            {results.metrics.paybackPeriod.toFixed(1)} mo
                          </div>
                        </div>
                        <div className="bg-secondary/40 p-4 rounded-xl border border-border/50 text-center">
                          <div className="text-xs text-muted-foreground">LTV : CAC</div>
                          <div className="mt-1 text-base font-extrabold">
                            {results.metrics.ltvToCac.toFixed(1)}x
                          </div>
                        </div>
                        <div className="bg-secondary/40 p-4 rounded-xl border border-border/50 text-center">
                          <div className="text-xs text-muted-foreground">SaaS Magic Number</div>
                          <div className="mt-1 text-base font-extrabold">
                            {results.metrics.magicNumber.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Saved Scenarios (Moved below Metrics Matrix) */}
                    {!isReadOnly && (
                      <div className="glass rounded-2xl p-6">
                        <h3 className="font-display text-sm font-bold">Saved Scenarios</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Save current slider configurations to quickly load later.
                        </p>

                        <div className="mt-4 flex gap-3 max-w-xl">
                          <input
                            type="text"
                            value={scenarioName}
                            placeholder="Scenario Name (e.g. Series A Target)..."
                            onChange={(e) => setScenarioName(e.target.value)}
                            className="flex-1 bg-secondary border border-border rounded-xl px-3.5 py-2 text-xs text-foreground focus:outline-none"
                          />
                          <Button
                            size="sm"
                            onClick={handleSaveScenario}
                            className="rounded-xl px-5 font-bold"
                          >
                            Save Scenario
                          </Button>
                        </div>

                        <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                          {savedScenarios.length === 0 ? (
                            <p className="text-xs text-muted-foreground">No saved scenarios yet.</p>
                          ) : (
                            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                              {savedScenarios.map((sc, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center bg-secondary/50 rounded-xl p-3 border border-border/50 text-xs"
                                >
                                  <span className="font-semibold truncate max-w-[120px]">
                                    {sc.name}
                                  </span>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleLoadScenario(sc.inputs)}
                                      className="text-primary hover:text-primary-glow font-bold"
                                    >
                                      Load
                                    </button>
                                    <button
                                      onClick={() => handleDeleteScenario(idx)}
                                      className="text-rose-400 hover:text-rose-500 font-bold"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* AI CFO Advisor Chat Panel */}
                {activeTab === "advisor" && (
                  <CfoAdvisor
                    inputs={inputs}
                    results={results}
                    currencySymbol={activeCurrency.symbol}
                    activeCurrency={activeCurrency}
                  />
                )}

                {/* Pricing Optimizer Panel */}
                {activeTab === "pricing" && (
                  <div className="space-y-6">
                    <div className="glass rounded-2xl p-6">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                          <h3 className="font-display text-base font-bold flex items-center gap-2">
                            <Target className="h-4 w-4 text-primary" /> Dynamic Tier Recommendation
                          </h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Recommended pricing plans structured for the{" "}
                            <strong>{inputs.targetMarket}</strong> segment.
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Market Segment:</span>
                          <Dropdown
                            options={[
                              { key: "Developer", label: "Developer" },
                              { key: "SMB", label: "SMB" },
                              { key: "Mid-Market", label: "Mid-Market" },
                              { key: "Enterprise", label: "Enterprise" },
                            ]}
                            selectedKey={inputs.targetMarket}
                            onChange={(key) =>
                              setInputs((p) => ({ ...p, targetMarket: key as TargetMarket }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-4">
                      {recommendations.map((plan) => (
                        <div
                          key={plan.name}
                          className={`rounded-2xl border p-5 flex flex-col justify-between ${plan.highlighted
                            ? "bg-card border-primary ring-1 ring-primary relative"
                            : "bg-card/50 border-border"
                            }`}
                        >
                          {plan.highlighted && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[10px] font-black uppercase text-primary-foreground tracking-wider">
                              Most Profitable
                            </span>
                          )}

                          <div>
                            <div className="text-sm font-bold text-foreground">{plan.name}</div>
                            <div className="mt-3 flex items-baseline gap-1">
                              <span className="text-3xl font-black">
                                {formatMoney(plan.price, activeCurrency)}
                              </span>
                              <span className="text-xs text-muted-foreground">/mo</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-1">
                              {plan.userLimit}
                            </p>

                            <div className="border-t border-border mt-4 pt-4 space-y-2">
                              {plan.features.map((f, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 text-[11px] text-muted-foreground"
                                >
                                  <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                                  <span className="truncate">{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6 border-t border-border/50 pt-4 space-y-1.5">
                            <div className="flex justify-between text-[10px] text-muted-foreground">
                              <span>Est. Share:</span>
                              <span className="font-semibold text-foreground">
                                {plan.estCustomers} users
                              </span>
                            </div>
                            <div className="flex justify-between text-[10px] text-muted-foreground">
                              <span>Projected MRR:</span>
                              <span className="font-semibold text-foreground">
                                {formatMoney(plan.revenue, activeCurrency)}
                              </span>
                            </div>
                            <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                              <span>Margin:</span>
                              <span
                                className={plan.margin > 70 ? "text-emerald-400" : "text-amber-400"}
                              >
                                {plan.margin.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Competitor Intel Section inside Pricing Optimizer */}
                    <div className="mt-8 border-t border-border/50 pt-8">
                      <CompetitorIntelligence />
                    </div>
                  </div>
                )}

                {/* Timeline Tab */}
                {activeTab === "timeline" && (
                  <StartupTimeline
                    inputs={inputs}
                    results={results}
                    currencySymbol={activeCurrency.symbol}
                    activeCurrency={activeCurrency}
                  />
                )}

                {/* Benchmarks Engine */}
                {activeTab === "benchmarks" && (
                  <div className="space-y-6">
                    <div className="glass rounded-2xl p-6">
                      <h3 className="font-display text-base font-bold">
                        Industry Benchmark Grading
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        We compare your current SaaS metrics against top-quartile software firms.
                      </p>
                    </div>

                    <div className="grid gap-4">
                      {results.benchmarks.map((grade) => (
                        <div
                          key={grade.metric}
                          className="glass rounded-xl p-5 border border-border/80 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-secondary/80 flex items-center justify-center font-display font-black text-base text-primary">
                              {grade.grade}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold">{grade.label}</h4>
                              <p className="text-xs text-muted-foreground max-w-lg mt-1">
                                {grade.feedback}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-black">{grade.value}</div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">
                              Percentile: {grade.percentile}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cloud Cost Engine */}
                {activeTab === "cloud" && (
                  <div className="space-y-6">
                    <div className="glass rounded-2xl p-6">
                      <h3 className="font-display text-base font-bold flex items-center gap-2">
                        <Server className="h-5 w-5 text-primary" /> Cloud Provider Cost Comparison
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Estimate and compare cloud hosting, databases, content delivery networks,
                        and backup services based on your user workloads.
                      </p>
                    </div>

                    <div className="grid gap-4">
                      {results.providers.map((p) => {
                        const isSelected = p.key === inputs.cloudProvider;
                        return (
                          <div
                            key={p.key}
                            className={`rounded-xl border p-5 flex flex-col justify-between sm:flex-row sm:items-center ${isSelected ? "bg-primary/5 border-primary" : "bg-card border-border"
                              }`}
                          >
                            <div>
                              <h4 className="text-sm font-bold flex items-center gap-2">
                                {p.name}{" "}
                                {isSelected && (
                                  <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded">
                                    Active Mode
                                  </span>
                                )}
                              </h4>
                              <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                                <span>
                                  Compute: <strong>{formatMoney(p.hosting, activeCurrency)}</strong>
                                </span>
                                <span>
                                  Database:{" "}
                                  <strong>{formatMoney(p.database, activeCurrency)}</strong>
                                </span>
                                <span>
                                  CDN/Egress: <strong>{formatMoney(p.cdn, activeCurrency)}</strong>
                                </span>
                                <span>
                                  Storage: <strong>{formatMoney(p.storage, activeCurrency)}</strong>
                                </span>
                              </div>
                            </div>

                            <div className="mt-4 sm:mt-0 text-right">
                              <div className="text-lg font-black">
                                {formatMoney(p.total, activeCurrency)}/mo
                              </div>
                              {!isSelected && (
                                <button
                                  onClick={() => {
                                    setInputs((prev) => ({ ...prev, cloudProvider: p.key }));
                                    toast.success(`Switched active cloud provider to ${p.name}`);
                                  }}
                                  className="text-[11px] text-primary font-bold hover:underline mt-1 block"
                                >
                                  Deploy Simulation
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Investor Mode Tab */}
                {activeTab === "investor" && (
                  <div className="space-y-6">
                    <div className="glass rounded-2xl p-6 border border-border/80 bg-aura">
                      <h3 className="font-display text-base font-bold flex items-center gap-2 text-foreground">
                        <Award className="h-5 w-5 text-primary" /> Investor Readiness Report Card
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Evaluate operational efficiency, revenue structures, burn rates, and overall
                        fundability scoring.
                      </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="glass rounded-2xl p-6 border border-border text-center">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                          Readiness Score
                        </div>
                        <div className="text-4xl font-black mt-2 text-gradient">
                          {results.healthScore}{" "}
                          <span className="text-xs text-muted-foreground">/ 100</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-2 font-medium">
                          Weighted score across margins, payback index, and runway buffers.
                        </p>
                      </div>

                      <div className="glass rounded-2xl p-6 border border-border">
                        <h4 className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                          Top Strengths
                        </h4>
                        <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                          <li className="flex items-start gap-1">
                            <span>•</span>
                            <span>
                              Gross margins are healthy at {results.grossMargin.toFixed(0)}%.
                            </span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span>•</span>
                            <span>
                              LTV:CAC ratio is positioned at {results.metrics.ltvToCac.toFixed(1)}x.
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="glass rounded-2xl p-6 border border-border">
                        <h4 className="text-xs text-rose-400 font-bold uppercase tracking-wider">
                          Fundraising Risks
                        </h4>
                        <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                          <li className="flex items-start gap-1">
                            <span>•</span>
                            <span>Customer churn rate sits at {inputs.churnRate}%.</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span>•</span>
                            <span>
                              Runway stands at{" "}
                              {results.runwayMonths === 999
                                ? "Profitable (No burn risk)"
                                : results.runwayMonths.toFixed(1) + " months"}
                              .
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Investor Q&A list */}
                    <div className="glass rounded-2xl p-6 border border-border/80 space-y-4">
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                        Likely Investor Questions & Preparation
                      </h4>
                      <div className="space-y-3.5">
                        <div className="bg-secondary/40 rounded-xl p-3 border border-border/30">
                          <p className="text-xs font-bold text-foreground">
                            1. \"What is driving the current gross margins levels, and how will
                            hosting scale as users grow?\"
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Answer Prep: Point out that hosting costs are $
                            {formatMoney(
                              results.infrastructure / Math.max(1, inputs.mau),
                              activeCurrency,
                            )}
                            /user. Edge networks migration will protect margins from dropping as
                            MAUs expand.
                          </p>
                        </div>
                        <div className="bg-secondary/40 rounded-xl p-3 border border-border/30">
                          <p className="text-xs font-bold text-foreground">
                            2. \"How do you plan to reduce customer churn levels to below 2%
                            monthly?\"
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Answer Prep: Focus on plans to transition SMB customers onto annual
                            payment plans, locking them in for 12-month periods.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Smart Reports Tab */}
                {activeTab === "report" && (
                  <div className="glass rounded-2xl p-6 space-y-6">
                    <div className="flex justify-between items-center border-b border-border pb-4">
                      <h3 className="font-display text-base font-bold flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" /> Platform Executive Summary &
                        Briefing
                      </h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleExportPDF}>
                          <Download className="h-4 w-4" /> Export PDF Report
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-6 text-sm text-foreground/90 max-w-3xl">
                      <div>
                        <h4 className="font-bold text-foreground">1. Financial Health Summary</h4>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          At current pricing ({formatMoney(inputs.arpu, activeCurrency)} ARPU), the
                          SaaS is producing a gross margin of{" "}
                          <strong>{results.grossMargin.toFixed(1)}%</strong> and monthly net profit
                          of <strong>{formatMoney(results.netProfit, activeCurrency)}</strong>. With
                          operational payroll and marketing spends, your total cash burn rate stands
                          at <strong>{formatMoney(results.burnRate, activeCurrency)}/mo</strong>.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground">
                          2. Pricing Strategy Evaluation
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          Optimizing pricing for target segment{" "}
                          <strong>{inputs.targetMarket}</strong> suggest pricing tiers from{" "}
                          {formatMoney(recommendations[0].price, activeCurrency)}/mo up to{" "}
                          {formatMoney(recommendations[3].price, activeCurrency)}/mo. The CAC
                          payback period is{" "}
                          <strong>{results.metrics.paybackPeriod.toFixed(1)} months</strong>,
                          confirming that customers cover their acquisition spends well inside their
                          lifetime values.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground">3. Key Risk Factors</h4>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed flex flex-wrap items-center gap-1.5">
                          {results.runwayMonths < 6 && results.runwayMonths > 0 ? (
                            <span className="text-rose-400 font-bold flex items-center gap-1">
                              <AlertTriangle className="h-4 w-4 text-rose-400" /> Warning: Critical
                              runway of {results.runwayMonths.toFixed(1)} months. Cash flow reserves
                              must be expanded immediately.
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-emerald-400" /> Safe Runway
                              position. Excellent cash allocation limits.
                            </span>
                          )}{" "}
                          Customer churn rate is at <strong>{inputs.churnRate}%/mo</strong>. In
                          order to scale without high customer acquisition drag, customer onboarding
                          retention must be prioritized.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
