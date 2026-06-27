# Clykur — SaaS Financial Intelligence Platform (2026 Edition)

Clykur is an AI-powered financial operating system designed for SaaS founders, startups, agencies, and investors. Built to feel as minimal, fast, and polished as Stripe, Linear, and Vercel, this application moves beyond basic calculator formulas to act as a core business planning suite.

## 🚀 Key Features

- **Interactive What-If Simulator**: Instantly evaluate business changes (e.g., doubling user scale, +25% pricing expansions, 50% churn reduction, team payroll shifts) with immediate visual feedback across metrics.
- **AI Financial Advisor**: An automated advisory algorithm checking gross margins, retention health, CAC ROI payback, and runway safety, with clean, actionable advice explaining _why_ suggestions are made.
- **Pricing Tier Optimizer**: Generates customized plans (Starter, Pro, Business, Enterprise) optimized for target markets (Developers, SMBs, Mid-Markets, Enterprise) and desired profit margin thresholds.
- **Cloud Cost Engine**: Calculates and compares real server compute, database system, global CDN bandwidth, and object storage configurations between AWS, GCP, Azure, Supabase/Vercel, Cloudflare, and Neon.
- **Industry Preset Templates**: Preloads realistic assumptions for specialized verticals: AI SaaS, Developer Tools, B2B CRM, FinTech Platforms, and Marketplaces.
- **Interactive Analytics Projections**: Beautiful interactive Recharts plotting 12-month compounding revenue projections, category expenses distributions, and cash bank runway trajectories.
- **Gamified Health Score**: A live 0–100 SaaS health check index measuring margins, CAC conversion, churn rates, and growth efficiency, awarding badges like _Excellent Margins_ and _Investor Ready_.
- **Command Palette (⌘K)**: A searchable keyboard command center to switch templates, run simulators, swap display currencies, and adjust parameters.
- **SEO Landing Generators**: Dynamically loads indexable routes and JSON-LD schemas optimized for calculators (MRR, Runway, LTV, Unit Economics) to attract organic traffic.
- **Smart Reports & CSV Exports**: Displays executive reports analyzing cash burn and pricing strategies, with immediate options to download raw CSV sheets.

---

## 📂 Project Structure

```text
src/
├── app/                  # App Router pages, SEO paths, layout & sitemaps
├── components/
│   ├── calc/
│   │   ├── Dashboard.tsx # Core Dashboard layout, metric cards & tabs
│   │   ├── CalcSlider.tsx # Reusable slider controls with tooltips
│   │   ├── CfoAdvisor.tsx # AI Financial Advisor algorithm and insight cards
│   │   ├── CompetitorIntelligence.tsx # Dynamic competitor tier simulation
│   │   └── StartupTimeline.tsx # Compound growth milestones timeline
│   ├── site/
│   │   ├── Navbar.tsx    # Premium responsive header navigation & currency controls
│   │   ├── CommandPalette.tsx # Searchable dashboard command palette (⌘K)
│   │   └── LandingPages.tsx   # SEO templates, JSON-LD schemas & marketing copies
│   └── ui/               # Modular UI primitives (Radix UI, styling components)
├── hooks/                # LocalStorage synchronization & media query hooks
├── lib/
│   ├── pricing.ts        # extended financial metrics, pricing presets & SaaS health math
│   ├── utils.ts          # Tailwind CSS merge utilities
│   └── lovable-error-reporting.ts # Localized application error capturing
```

---

## 🛠️ Getting Started & Scripts

In the project root, you can run:

```bash
# Start Next.js development server
npm run dev

# Format code using Prettier
npm run format

# Run ESLint validation
npm run lint

# Compile and check TypeScript types
npm run typecheck

# Build optimizations for production
npm run build

# Verify build status (runs typecheck, lint, and build)
npm run verify
```

---

## 🔒 Platform Authentication Strategy

All core features, sliders, AI advice generation, cost comparisons, and report exports operate **completely client-side** in the browser with local storage persistence. Saving persistent workspaces, sharing reports, and cloud synchronization support mock signups to provide zero-friction experiences.
