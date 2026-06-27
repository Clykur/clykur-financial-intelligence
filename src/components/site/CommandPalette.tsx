"use client";

import React, { useState, useEffect } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Terminal, Zap, RefreshCw, Sparkles, DollarSign, Briefcase, Layers } from "lucide-react";
import { toast } from "sonner";
import { TEMPLATES, type CalculatorInputs, type CurrencyCode } from "@/lib/pricing";

interface CommandPaletteProps {
  onLoadTemplate: (inputs: CalculatorInputs) => void;
  onSimulate: (type: string) => void;
  onSwitchCurrency: (cur: CurrencyCode) => void;
}

export function CommandPalette({
  onLoadTemplate,
  onSimulate,
  onSwitchCurrency,
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const triggerAction = (label: string, callback: () => void) => {
    callback();
    setOpen(false);
    toast.success(`Executed action: ${label}`);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-transform"
      >
        <Terminal className="h-4 w-4" /> Press{" "}
        <kbd className="font-sans font-bold bg-primary-glow/20 px-1.5 py-0.5 rounded">⌘K</kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Industry Templates">
            {Object.entries(TEMPLATES).map(([key, item]) => (
              <CommandItem
                key={key}
                onSelect={() =>
                  triggerAction(`Load ${item.label} Preset`, () => onLoadTemplate(item.inputs))
                }
                className="flex items-center gap-2"
              >
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>Load {item.label} Preset</span>
                <span className="text-[10px] text-muted-foreground ml-auto">
                  {item.description}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="What-If Simulator Presets">
            <CommandItem
              onSelect={() =>
                triggerAction("Double Users Simulation", () => onSimulate("double-users"))
              }
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4 text-primary" />
              <span>Simulate: Double Users & Customers</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                triggerAction("10x API Load Simulation", () => onSimulate("10x-traffic"))
              }
              className="flex items-center gap-2"
            >
              <Layers className="h-4 w-4 text-primary" />
              <span>Simulate: 10x API traffic load</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                triggerAction("+25% Price Expansion", () => onSimulate("price-increase"))
              }
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Simulate: +25% Price Increase</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                triggerAction("Reduce Customer Churn by 50%", () => onSimulate("reduce-churn"))
              }
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4 text-primary" />
              <span>Simulate: 50% lower customer churn</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Calculator Configurations">
            <CommandItem
              onSelect={() => triggerAction("Switch to USD", () => onSwitchCurrency("USD"))}
              className="flex items-center gap-2"
            >
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>Switch Display Currency to USD ($)</span>
            </CommandItem>
            <CommandItem
              onSelect={() => triggerAction("Switch to INR", () => onSwitchCurrency("INR"))}
              className="flex items-center gap-2"
            >
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>Switch Display Currency to INR (₹)</span>
            </CommandItem>
            <CommandItem
              onSelect={() => triggerAction("Switch to EUR", () => onSwitchCurrency("EUR"))}
              className="flex items-center gap-2"
            >
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>Switch Display Currency to EUR (€)</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
