import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/app/icon.png";

export function Navbar() {
  const pathname = usePathname();
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isLight = saved === "light";

    setLight(isLight);
    document.documentElement.classList.toggle("light", isLight);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["Top", "features", "seo-tools", "faq"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const navItem = (section: string) =>
    `relative inline-flex h-10 items-center text-sm font-semibold transition-colors duration-200
   after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-full
   after:origin-left after:scale-x-0 after:rounded-full after:bg-primary
   after:transition-transform after:duration-300
   ${
     pathname === "/" && activeSection === section
       ? "text-primary after:scale-x-100"
       : "text-muted-foreground hover:text-foreground hover:after:scale-x-100 hover:after:bg-primary/50"
   }`;

  const toggleTheme = () => {
    const next = !light;

    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 print:hidden"
    >
      <div className="mx-auto flex h-20 max-w-[90vw] w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-xl font-black tracking-tight text-foreground"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-transparent hover:bg-primary/10 transition-colors text-primary-foreground">
            <Image src={logo} alt="logo" width={40} height={40} />
          </span>

          <div className="flex flex-col leading-none">
            <span className="font-display text-xl font-black tracking-tight text-primary">
              Clykur
            </span>
            <span className="hidden text-xs font-medium tracking-wide text-muted-foreground lg:block">
              SaaS Financial Intelligence Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
          <Link href="/#features" className={navItem("features")}>
            Features
          </Link>

          <Link href="/#seo-tools" className={navItem("seo-tools")}>
            Calculators
          </Link>

          <Link href="/#faq" className={navItem("faq")}>
            FAQ
          </Link>

          <Link
            href="/dashboard"
            className={`transition-colors hover:text-foreground ${
              pathname === "/dashboard"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-muted-foreground"
            }`}
          >
            Dashboard
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {light ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-amber-400" />}
          </Button>

          <Button variant="hero" asChild>
            <Link href="/dashboard">Start Planning</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {light ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-amber-400" />}
          </Button>

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
        className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden"
      >
        <div className="flex flex-col p-4">
          <Link
            href="/#features"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-3 hover:bg-muted text-sm font-semibold text-muted-foreground"
          >
            Features
          </Link>

          <Link
            href="/#seo-tools"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-3 hover:bg-muted text-sm font-semibold text-muted-foreground"
          >
            Calculators
          </Link>

          <Link
            href="/dashboard"
            onClick={() => setMenuOpen(false)}
            className={`rounded-lg px-3 py-3 hover:bg-muted text-sm font-bold ${
              pathname === "/dashboard" ? "text-primary bg-primary/5" : "text-muted-foreground"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/#faq"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-3 hover:bg-muted text-sm font-semibold text-muted-foreground"
          >
            FAQ
          </Link>

          <Button variant="hero" asChild className="mt-4 w-full">
            <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
              Start Planning
            </Link>
          </Button>
        </div>
      </motion.div>
    </motion.header>
  );
}
