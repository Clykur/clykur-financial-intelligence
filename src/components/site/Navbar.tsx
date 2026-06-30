"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ThemeToggle } from "@/components/site/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItem = (path: string) =>
    `relative inline-flex h-10 items-center text-sm font-semibold transition-colors duration-200
   after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-full
   after:origin-left after:scale-x-0 after:rounded-full after:bg-primary
   after:transition-transform after:duration-300
   ${
     pathname === path
       ? "text-primary after:scale-x-100"
       : "text-muted-foreground hover:text-foreground hover:after:scale-x-100 hover:after:bg-primary/50"
   }`;

  return (
    <motion.header
      initial={false}
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 print:hidden"
    >
      <div className="site-container flex h-16 sm:h-20 w-full items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 sm:gap-3 font-display text-lg sm:text-xl font-black tracking-tight text-foreground"
        >
          {/* SVG monogram mark */}
          <span className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="5" fill="#5757f8" />
              <path d="M7 6h2.5v9H15v2H7V6Z" fill="white" />
              <path d="M14 6h2.5v2H14V6Z" fill="rgba(255,255,255,0.5)" />
            </svg>
          </span>

          <div className="flex flex-col leading-none">
            <span className="font-display text-xl font-black tracking-tight text-primary">
              LedgerOS
            </span>
            <span className="hidden text-xs font-medium tracking-wide text-muted-foreground lg:block">
              SaaS Financial Intelligence Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex xl:gap-8">
          <Link href="/product" className={navItem("/product")}>
            Product
          </Link>

          <Link href="/solutions" className={navItem("/solutions")}>
            Solutions
          </Link>

          <Link href="/pricing" className={navItem("/pricing")}>
            Pricing
          </Link>

          <Link href="/company" className={navItem("/company")}>
            Company
          </Link>

          <Link href="/docs" className={navItem("/docs")}>
            API Docs
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />

          <Button variant="hero" asChild>
            <Link href="/app">Start Planning</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: menuOpen ? "auto" : 0,
          opacity: menuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden border-t border-border bg-background lg:hidden max-h-[min(70vh,calc(100dvh-var(--site-header-height)))] overflow-y-auto"
      >
        <div className="flex flex-col p-4">
          <Link
            href="/product"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-3 hover:bg-muted text-sm font-semibold text-muted-foreground"
          >
            Product
          </Link>

          <Link
            href="/solutions"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-3 hover:bg-muted text-sm font-semibold text-muted-foreground"
          >
            Solutions
          </Link>

          <Link
            href="/pricing"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-3 hover:bg-muted text-sm font-semibold text-muted-foreground"
          >
            Pricing
          </Link>

          <Link
            href="/company"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-3 hover:bg-muted text-sm font-semibold text-muted-foreground"
          >
            Company
          </Link>

          <Link
            href="/docs"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-3 hover:bg-muted text-sm font-semibold text-muted-foreground"
          >
            API Docs
          </Link>

          <Button variant="hero" asChild className="mt-4 w-full">
            <Link href="/app" onClick={() => setMenuOpen(false)}>
              Start Planning
            </Link>
          </Button>
        </div>
      </motion.div>
    </motion.header>
  );
}
