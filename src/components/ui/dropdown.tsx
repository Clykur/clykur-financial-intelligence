"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface DropdownOption {
  key: string;
  label: string;
}

interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  selectedKey: string;
  onChange: (key: string) => void;
  placeholder?: string;
}

export function Dropdown({
  label,
  options,
  selectedKey,
  onChange,
  placeholder = "Select option...",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.key === selectedKey);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left w-full sm:w-auto">
      {label && (
        <span className="block text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1.5">
          {label}
        </span>
      )}
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex w-full justify-between items-center gap-x-1.5 rounded-xl bg-secondary hover:bg-accent border border-border/80 px-3.5 py-2 text-xs font-semibold text-foreground transition-all focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 z-[999] mt-1.5 w-full min-w-[200px] origin-top-left rounded-xl bg-card border border-border shadow-xl ring-1 ring-black/5 focus:outline-none max-h-60 overflow-y-auto">
          <div className="py-1">
            {options.map((option) => {
              const isSelected = option.key === selectedKey;
              return (
                <button
                  key={option.key}
                  onClick={() => {
                    onChange(option.key);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3.5 py-2 text-left text-xs font-medium transition ${
                    isSelected ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
