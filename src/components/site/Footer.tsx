import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border print:hidden mt-auto">
      <div className="site-container flex flex-col items-center justify-between gap-6 py-8 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-xl font-black tracking-tight text-foreground"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
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
            <span className="text-primary font-display text-xl font-black tracking-tight">
              LedgerOS
            </span>
            <span className="hidden text-xs font-medium text-muted-foreground lg:block">
              SaaS Financial Intelligence Platform
            </span>
          </div>
        </Link>

        <div className="flex max-w-md flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-semibold text-muted-foreground opacity-80 sm:justify-end">
          <span>SOC2 Type II Ready</span>
          <span className="hidden sm:inline">&bull;</span>
          <span>GDPR Compliant</span>
          <span className="hidden sm:inline">&bull;</span>
          <span>ISO 27001 Prepared</span>
        </div>

        <p className="text-xs sm:text-sm max-w-xs sm:max-w-none">
          © {new Date().getFullYear()} LedgerOS Financial OS. Built for SaaS Founders.
        </p>
      </div>
    </footer>
  );
}
