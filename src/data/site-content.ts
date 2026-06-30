import { Calculator as CalcIcon, PieChart, Sliders, Sparkles, Gauge, Globe } from "lucide-react";

export const siteContent = {
  homepage: {
    hero: {
      eyebrow: "SaaS Financial Intelligence",
      title: "The SaaS Financial Intelligence Platform.",
      subtitle:
        "One workspace for MRR, runway, cloud COGS, and unit economics. Backed by deterministic math, exportable models, and an API your team can audit.",
      trustLine: "SOC 2–ready controls · GDPR-aligned data handling · No credit card to start",
      trustPillars: [
        { label: "Deterministic engine", detail: "Same inputs, same outputs, every time." },
        { label: "Export anywhere", detail: "CSV, JSON, and webhooks for your stack." },
        { label: "Role-aware access", detail: "Founder, finance, and eng views." },
      ],
      cta: {
        text: "Start Planning",
        href: "/app",
      },
      trustedLabel: "Trusted by innovative teams using",
      companies: ["Stripe", "AWS", "Plaid", "Vercel"],
    },
    integrations: {
      label: "NATIVE INTEGRATIONS",
      list: ["Stripe", "AWS", "Vercel", "Google Cloud", "Datadog"],
    },
    features: {
      eyebrow: "Intelligence Platform",
      title: "Engineered for Software Builders",
      subtitle:
        "Model like you ship code: version scenarios, stress-test assumptions, and share board-ready numbers without spreadsheet drift.",
      items: [
        {
          icon: CalcIcon,
          title: "AI Financial Modeling",
          desc: "Model pricing, revenue, expenses, runway, and profitability with real-time calculations built for modern SaaS businesses.",
        },
        {
          icon: Sliders,
          title: "What-If Scenario Simulator",
          desc: "Instantly evaluate pricing changes, user growth, churn, payroll, infrastructure, and acquisition costs with interactive simulations.",
        },
        {
          icon: PieChart,
          title: "Forecasting & Analytics",
          desc: "Visualize revenue growth, cash runway, burn rate, gross margins, and financial trends through interactive dashboards.",
        },
        {
          icon: Sparkles,
          title: "AI Financial Advisor",
          desc: "Receive intelligent recommendations to improve pricing, margins, customer economics, runway, and overall business performance.",
        },
        {
          icon: Gauge,
          title: "SaaS Health Score",
          desc: "Measure your company's financial health using key metrics like MRR growth, LTV:CAC, churn, Rule of 40, and profitability.",
        },
        {
          icon: Globe,
          title: "Cloud Cost Intelligence",
          desc: "Compare AWS, Google Cloud, Azure, Vercel, Supabase, Cloudflare, Neon, and more to identify the most cost-efficient infrastructure.",
        },
      ],
    },
    comparison: {
      chaos: {
        label: "The Chaos",
        title: "Financial Data Silos",
        desc: "Startups model revenue in spreadsheets, track cloud costs in AWS consoles, and analyze metrics in separate dashboards. Growth projections and burn rate calculations are disjointed and error-prone.",
      },
      blueprint: {
        label: "The Blueprint",
        title: "Unified Intelligence",
        desc: "LedgerOS integrates real-time cloud costs (AWS, GCP, Vercel) with core SaaS metrics (MRR, Churn) into a single, automated engine. Optimize the Rule of 40, extend runway, and model growth seamlessly.",
      },
    },
    metrics: [
      { value: "12k+", label: "Scenarios Modeled" },
      { value: "<100ms", label: "Typical Simulation" },
      { value: "99.9%", label: "Platform Uptime Target" },
      { value: "0", label: "Spreadsheet Lock-in", highlight: true },
    ],
    developer: {
      eyebrow: "// DEVELOPER API",
      title: "Programmatic Finance.",
      desc: "Push metrics, run simulations, and query financial health directly from your CI/CD pipeline or internal dashboard. Built by engineers, for engineers.",
      cta: {
        text: "View API Docs",
        href: "/docs",
      },
      codeSnippet: {
        method: "POST",
        path: "/v1/simulations/run",
        scenario: "increase_pricing_v2",
        mrrGrowth: 1.15,
        churnImpact: 0.02,
      },
    },
    testimonials: {
      eyebrow: "Field Reports",
      title: "What Builders Say",
      list: [
        {
          quote:
            "LedgerOS removed the guesswork from our infrastructure scaling. We instantly identified $4,000 in monthly Vercel and AWS bloat, allowing us to hit profitability 6 months earlier than projected.",
          author: "Alex Chen",
          role: "CTO, DataFlow API",
          initial: "A",
        },
        {
          quote:
            "The ability to model MRR growth alongside real-time cloud costs changed how we operate. We replaced 4 separate spreadsheets with one unified API.",
          author: "Sarah Jenkins",
          role: "VP Finance, SaaSify",
          initial: "S",
        },
        {
          quote:
            "Finally, a financial tool that speaks engineer. Pushing cost projections directly into our CI/CD pipeline ensures we never release a feature that kills our margins.",
          author: "David Park",
          role: "Founder, BuildStream",
          initial: "D",
        },
        {
          quote:
            "It's like having a fractional CFO built into our codebase. We extended our runway by 8 months just by following the automated advisor insights.",
          author: "Elena Rodriguez",
          role: "CEO, MetricOps",
          initial: "E",
        },
      ],
    },
  },
  product: {
    hero: {
      eyebrow: "PRODUCT OVERVIEW",
      title: "The Financial Intelligence Engine.",
      subtitle:
        "Connect billing, payroll, and cloud spend into one model your whole leadership team can trust. Every projection is traceable to inputs you control. No black-box forecasts.",
    },
    modules: [
      {
        id: "// MODULE 01",
        title: "Predictive Modeling",
        desc: "Define baseline parameters and run thousands of Monte Carlo simulations to find your optimal pricing tier. Our deterministic calculation engine handles complex tiered pricing, usage-based billing, and multi-currency conversions in real-time.",
        features: [
          "Cohort Retention Curves",
          "LTV:CAC Scenario Analysis",
          "Headcount vs Revenue Ratios",
          "Gross Margin Projections",
        ],
      },
      {
        id: "// MODULE 02",
        title: "AI Cost Auditing",
        desc: "Connect your cloud providers. The AI CFO scans for unoptimized compute, idle databases, and over-provisioned clusters, suggesting immediate instance downgrades and reserved instance strategies.",
        features: [
          "AWS EC2/RDS Rightsizing",
          "Vercel Bandwidth Alerts",
          "Datadog Log Volume Analysis",
          "Multi-cloud Arbitrage",
        ],
      },
      {
        id: "// MODULE 03",
        title: "API-First Data",
        desc: "Never get locked into a dashboard. Export every projection, metric, and audit log to your data warehouse via GraphQL or embed interactive calculators directly into your internal admin tooling using our React SDK.",
        features: [
          "Real-time Webhooks",
          "Snowflake & BigQuery Sync",
          "TypeScript / React SDK",
          "Terraform Provider (Beta)",
        ],
      },
    ],
    details: {
      left: {
        eyebrow: "SYSTEM ARCHITECTURE",
        title: "Low-Latency Engine",
        desc: "Built on a distributed edge architecture, the LedgerOS engine executes financial projections in sub-100ms. We use an event-driven architecture to ensure your financial models reflect reality the second a Stripe invoice clears.",
        features: [
          "Next.js 15 App Router (Edge)",
          "Rust-based Monte Carlo Engine",
          "Vercel Edge Functions",
          "Redis Upstash Caching Layer",
        ],
      },
      codeSnippet: [
        {
          endpoint: "/api/v1/simulate",
          method: "POST",
          latency: "42ms",
          status: 200,
          payload: {
            mrr_growth_cagr: 0.124,
            projected_runway_months: 24,
            breakeven_confidence: 0.94,
            rule_of_40_score: 42.5,
          },
        },
      ],
    },
    compliance: {
      eyebrow: "TRUST CENTER",
      title: "Security You Can Review",
      desc: "We publish control summaries and support security questionnaires for Pro and Enterprise teams.",
      list: [
        { name: "SOC 2", desc: "Type II readiness program" },
        { name: "AES-256", desc: "Encryption at rest & in transit" },
        { name: "SSO", desc: "SAML & RBAC on Enterprise" },
        { name: "GDPR", desc: "Data processing addendum" },
      ],
    },
    cta: {
      title: "Ready to build your baseline?",
      desc: "Stop guessing your unit economics. Use our interactive workflow builder to construct your SaaS financial model today. No spreadsheets required.",
      buttonText: "Launch Workflow Builder",
      href: "/app",
    },
  },
  solutions: {
    hero: {
      eyebrow: "USE CASES",
      title: "Engineered for Modern Operators.",
      subtitle:
        "From first paying customer to multi-product scale, LedgerOS gives each stage a clear financial playbook. Runway, margins, and pricing without rebuilding models every quarter.",
    },
    proof: [
      { stat: "6–8 mo", label: "Avg. runway extension reported by design partners" },
      { stat: "4→1", label: "Typical tool consolidation (Sheets + cloud console + BI)" },
      { stat: "24h", label: "Time to first board-ready export" },
    ],
    tier1: {
      eyebrow: "// TIER 01",
      title: "For Startups",
      desc: "Pre-product market fit is chaos. LedgerOS helps you model survival. Automate burn rate calculations, build investor-ready pitch deck projections, and test freemium-to-paid conversion scenarios before writing a single line of pricing logic.",
      features: [
        {
          name: "Burn Rate Optimization",
          desc: "Simulate cash runway against 15+ hiring and infrastructure scaling scenarios.",
        },
        {
          name: "Freemium Conversion",
          desc: "Model exact MRR impact of tweaking trial lengths and usage limits.",
        },
        {
          name: "Seed Stage Reporting",
          desc: "Generate instantaneous board updates directly from Stripe and bank APIs.",
        },
        {
          name: "Founder Dilution",
          desc: "Cap table modeling integrated natively with future revenue milestones.",
        },
      ],
    },
    tier2: {
      eyebrow: "// TIER 02",
      title: "For Scale-ups",
      desc: "Scaling breaks spreadsheets. When you are processing millions of events per second, you need programmatic finance. LedgerOS connects to your cloud providers and analytics pipelines to attribute costs and revenue on a per-customer, per-product basis.",
      features: [
        {
          name: "Multi-Product Attribution",
          desc: "Isolate COGS and gross margins across distinct product lines and SKUs.",
        },
        {
          name: "Cloud Cost Arbitrage",
          desc: "Automated ML recommendations for spot instances and cross-region migrations.",
        },
        {
          name: "Headcount vs Automation",
          desc: "Calculate the precise breakeven point for engineering an automated internal tool.",
        },
        {
          name: "Enterprise Procurement",
          desc: "Scenario planning for multi-year contract discounting and implementation costs.",
        },
      ],
    },
    workflows: {
      eyebrow: "// VISUAL WORKFLOWS",
      title: "Node-Based Modeling",
      desc: "Construct financial models the exact same way you construct data pipelines. Connect inputs to transformation functions to output sinks.",
      nodes: [
        {
          id: "NODE.01",
          type: "INPUT",
          title: "Data Source",
          desc: "Import real-time metrics from Stripe billing, AWS Cost Explorer, and Snowflake via secure OAuth.",
        },
        {
          id: "NODE.02",
          type: "PROCESS",
          title: "Transformation",
          desc: "Link raw inputs to MRR growth formulas, churn decay logic, server scaling curves, and custom JS functions.",
          highlighted: true,
        },
        {
          id: "NODE.03",
          type: "OUTPUT",
          title: "Projection",
          desc: "Output cash runway timelines, margin analysis, and formatted JSON payloads directly to your internal dashboards.",
        },
      ],
    },
  },
  pricing: {
    hero: {
      eyebrow: "BILLING",
      title: "Transparent Pricing. No Surprises.",
      subtitle:
        "Start modeling for free. Upgrade when you need live integrations, shared workspaces, and API access. Every plan includes encrypted storage and CSV export.",
    },
    trust: {
      title: "Included on every plan",
      items: [
        "AES-256 encryption at rest",
        "CSV & JSON export",
        "No training on your workspace data",
        "14-day Pro trial with full API access",
        "Free tier stays free for solo founders",
        "No annual lock-in on Pro",
      ],
    },
    comparison: {
      eyebrow: "// FEATURE MATRIX",
      title: "Compare plans",
      categories: [
        {
          name: "Modeling",
          rows: [
            { label: "MRR, runway & LTV calculators", builder: true, pro: true, enterprise: true },
            { label: "Saved scenarios", builder: "3", pro: "Unlimited", enterprise: "Unlimited" },
            { label: "Workflow builder", builder: false, pro: true, enterprise: true },
            { label: "Monte Carlo simulations", builder: false, pro: true, enterprise: true },
          ],
        },
        {
          name: "Integrations",
          rows: [
            { label: "Stripe billing sync", builder: false, pro: true, enterprise: true },
            {
              label: "Cloud cost sync (AWS, GCP, Vercel)",
              builder: false,
              pro: true,
              enterprise: true,
            },
            { label: "API & webhooks", builder: false, pro: true, enterprise: true },
            { label: "Custom integrations", builder: false, pro: false, enterprise: true },
          ],
        },
        {
          name: "Team & security",
          rows: [
            { label: "Team seats", builder: "1", pro: "3", enterprise: "Custom" },
            { label: "SAML SSO", builder: false, pro: false, enterprise: true },
            { label: "SOC 2 report access", builder: false, pro: false, enterprise: true },
            { label: "Dedicated success manager", builder: false, pro: false, enterprise: true },
          ],
        },
      ],
    },
    faq: {
      eyebrow: "// FAQ",
      title: "Common questions",
      items: [
        {
          q: "Is the free plan really free?",
          a: "Yes. Solo founders keep core calculators and three saved scenarios at $0. You only pay when you need syncs, API keys, or team seats.",
        },
        {
          q: "Where is my data stored?",
          a: "Production data is hosted in SOC 2–aligned regions with encryption at rest. Enterprise can request EU-only residency.",
        },
        {
          q: "Can I export my models?",
          a: "Every scenario exports to CSV or JSON. Pro and Enterprise add scheduled exports and webhooks.",
        },
        {
          q: "Do you train AI on my numbers?",
          a: "No. Advisor insights run on your workspace data only and are not used to train shared models.",
        },
        {
          q: "What happens when I outgrow Pro?",
          a: "Book a call with our team. Enterprise adds SSO, SLAs, VPC options, and custom integration work without migrating your scenarios.",
        },
      ],
    },
    cta: {
      title: "Start with the numbers you have today.",
      desc: "Launch the workflow builder in minutes. Import assumptions manually, then connect Stripe and cloud when you are ready.",
      buttonText: "Open Workflow Builder",
      href: "/app",
    },
    tiers: [
      {
        id: "// TIER 01",
        name: "Builder",
        desc: "Solo founders validating pricing and runway.",
        price: "$0",
        priceNote: "Forever free for individuals",
        features: [
          "MRR, runway & LTV calculators",
          "3 saved scenarios",
          "CSV export",
          "Community support",
        ],
        unavailable: ["API access", "Live billing sync"],
        cta: "Start Free",
        href: "/app",
      },
      {
        id: "// TIER 02",
        name: "Pro",
        desc: "Teams shipping models with live data.",
        price: "$49",
        priceNote: "Per workspace / month",
        recommended: true,
        features: [
          "Workflow builder & unlimited scenarios",
          "Stripe & cloud cost sync",
          "API keys & webhooks",
          "3 team seats included",
          "Priority email support",
        ],
        cta: "Start Pro Trial",
        href: "/app",
      },
      {
        id: "// TIER 03",
        name: "Enterprise",
        desc: "Regulated teams and multi-entity finance.",
        price: "Custom",
        priceNote: "Annual agreements available",
        features: [
          "Everything in Pro",
          "Unlimited seats & custom roles",
          "VPC & private deployment options",
          "SOC 2 report & security reviews",
          "99.99% SLA & SAML SSO",
        ],
        cta: "Talk to Sales",
        href: "/company",
      },
    ],
  },
  company: {
    hero: {
      eyebrow: "COMPANY",
      title: "Building the OS for Financial Intelligence.",
      subtitle:
        "Founded in 2026 by engineers and operators who lived through spreadsheet-driven board decks. We build financial tooling with the same rigor as production software: tests, audit logs, and clear assumptions.",
    },
    values: [
      {
        title: "Show your work",
        desc: "Every chart links back to inputs. If a number cannot be explained, it does not ship.",
      },
      {
        title: "Bias toward operators",
        desc: "We optimize for founders and finance leads who need answers weekly. Not quarterly consulting decks.",
      },
      {
        title: "Privacy by default",
        desc: "Your metrics stay yours. We do not sell data or train shared models on customer workspaces.",
      },
    ],
    mission: {
      eyebrow: "// CORE DIRECTIVE",
      title: "Our Mission",
      desc: "To eliminate financial guesswork for software companies by providing deterministic, API-first tools for modeling revenue, infrastructure costs, and customer unit economics.",
    },
    deployment: {
      eyebrow: "// DEPLOYMENT",
      title: "Global Node",
      items: [
        {
          label: "HQ Location",
          value: "Bengaluru, KA",
          sub: "(ASIA-SOUTH)",
        },
        {
          label: "Workforce",
          value: "Remote-first",
          sub: "Spanning 12 timezones",
        },
        {
          label: "System Status",
          value: "OPERATIONAL",
          status: true,
        },
      ],
    },
    backers: {
      eyebrow: "// CAPITAL",
      title: "Early Design Partners",
      desc: "Teams across B2B SaaS, dev tools, and fintech pilot LedgerOS before every feature goes GA. Their feedback shapes our roadmap.",
      list: [
        { name: "API Platform", highlighted: true },
        { name: "Vertical SaaS" },
        { name: "Fintech Infra", darkBg: true },
      ],
    },
  },
  docs: {
    hero: {
      eyebrow: "API REFERENCE",
      title: "Programmatic Finance API.",
      subtitle:
        "REST endpoints with predictable schemas, idempotent writes, and sandbox keys. So finance and engineering can integrate without shadow spreadsheets.",
    },
    reliability: {
      title: "Built for production pipelines",
      items: [
        "Versioned API (v1) with backward-compatible changes",
        "Structured error codes and request IDs in every response",
        "Sandbox environment mirrors production limits at lower rate caps",
      ],
    },
    guides: [
      {
        title: "Authentication",
        desc: "All API requests must be authenticated using a Bearer token passed in the Authorization header. You can generate API keys inside the LedgerOS Developer settings console. Keep secret keys secure.",
        code: "Authorization: Bearer ck_live_...",
      },
      {
        title: "Rate Limiting",
        desc: "API calls are limited to 1,000 requests per minute on production keys and 100 requests per minute on sandbox keys. Headers return remaining limits on every execution response.",
        code: "X-RateLimit-Limit: 1000\nX-RateLimit-Remaining: 994",
      },
      {
        title: "Environments",
        desc: "We support sandbox mode to safely run simulations without impacting active accounts. Toggle endpoints by changing the subdomain from api to sandbox.",
        code: "https://sandbox-api.ledgeros.com/v1",
      },
    ],
    endpoints: [
      {
        id: "// ENDPOINT 01",
        title: "Simulate",
        method: "POST",
        path: "/v1/simulations/run",
        desc: "Execute a financial simulation against a defined set of assumptions. Supports modifying churn, acquisition costs, and pricing tiers simultaneously.",
        label: "cURL Request",
        code: `curl -X POST https://api.ledgeros.com/v1/simulations/run \\
  -H "Authorization: Bearer ck_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "scenario": "increase_pricing_v2",
    "variables": {
      "mrr_growth_rate": 1.15,
      "churn_impact": 0.02
    }
  }'`,
        formatted: {
          command: "curl",
          args: "-X POST https://api.ledgeros.com/v1/simulations/run \\",
          headers: ['"Authorization: Bearer ck_live_..."', '"Content-Type: application/json"'],
          payload: {
            scenario: "increase_pricing_v2",
            mrr_growth_rate: 1.15,
            churn_impact: 0.02,
          },
        },
      },
      {
        id: "// ENDPOINT 02",
        title: "Metrics",
        method: "GET",
        path: "/v1/metrics/mrr",
        desc: "Retrieve historical and projected Monthly Recurring Revenue (MRR) based on active customer cohort data and configured pricing schemas.",
        label: "JSON Response",
        colorGreen: true,
        code: `{
  "status": "success",
  "data": {
    "current_mrr": 124500.00,
    "projected_mrr_12mo": 380200.00,
    "currency": "INR"
  }
}`,
        formattedResponse: {
          status: "success",
          current_mrr: "124500.00",
          projected_mrr: "380200.00",
          currency: "INR",
        },
      },
      {
        id: "// ENDPOINT 03",
        title: "Cloud Sync",
        method: "GET",
        path: "/v1/costs/cloud",
        desc: "Fetch real-time synchronized cloud costs from linked AWS, GCP, Azure, or Vercel accounts to run continuous gross margin calculations.",
        label: "cURL Request",
        colorGreen: true,
        code: `curl -X GET https://api.ledgeros.com/v1/costs/cloud?provider=aws \\
  -H "Authorization: Bearer ck_live_..."`,
        formatted: {
          command: "curl",
          args: "-X GET https://api.ledgeros.com/v1/costs/cloud?provider=aws \\",
          headers: ['"Authorization: Bearer ck_live_..."'],
        },
      },
      {
        id: "// ENDPOINT 04",
        title: "Optimize",
        method: "POST",
        path: "/v1/budgets/optimize",
        desc: "Scan linked infrastructure configs to identify architectural wastage, redundant nodes, or log-level spikes, returning automated recommendations to optimize costs.",
        label: "cURL Request",
        code: `curl -X POST https://api.ledgeros.com/v1/budgets/optimize \\
  -H "Authorization: Bearer ck_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "provider": "aws",
    "max_actionable_items": 5
  }'`,
        formatted: {
          command: "curl",
          args: "-X POST https://api.ledgeros.com/v1/budgets/optimize \\",
          headers: ['"Authorization: Bearer ck_live_..."', '"Content-Type: application/json"'],
          payload: {
            provider: "aws",
            max_actionable_items: 5,
          },
        },
      },
      {
        id: "// ENDPOINT 05",
        title: "Scenarios",
        method: "GET",
        path: "/v1/scenarios",
        desc: "Retrieve a list of all custom-configured financial scenarios, projections, variables, and Monte Carlo settings configured on your account.",
        label: "JSON Response",
        colorGreen: true,
        code: `{
  "status": "success",
  "data": {
    "count": 2,
    "items": [
      { "id": "increase_pricing_v2", "name": "Tier 2 Pricing Lift" },
      { "id": "hire_5_devs", "name": "Engineering Scale-up" }
    ]
  }
}`,
        formattedResponse: {
          status: "success",
          current_mrr: "2",
          projected_mrr: "Tier 2 Pricing Lift", // We will make page.tsx render simple formatted response key values dynamically
          currency: "Engineering Scale-up",
        },
      },
    ],
  },
  app: {
    hero: {
      eyebrow: "BUILDER",
      titleLine1: "Financial Intelligence",
      titleLine2: "Builder.",
      subtitle:
        "Model scenarios and optimize unit economics using our engineering-grade node builder. Select a module below to begin simulation.",
    },
    defaultModule: "suite",
    modules: [
      { key: "mrr", label: "MRR Module" },
      { key: "runway", label: "Runway Module" },
      { key: "ltv", label: "LTV Module" },
      { key: "suite", label: "Full Unit Economics Suite" },
    ],
    modulePanel: {
      injectionPrefix: "SEO MODULE INJECTION",
      contentEyebrow: "CONTENT",
      contentHeading: "Payload",
      keywordsEyebrow: "KEYWORDS MATRIX",
    },
    seo: {
      mrr: {
        title: "SaaS Monthly Recurring Revenue (MRR) Calculator",
        description:
          "Accurately compute and forecast your SaaS Monthly Recurring Revenue (MRR) considering annual subscription plans, customer expansions, and churn metrics.",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "SaaS MRR Calculator",
          operatingSystem: "All",
          applicationCategory: "BusinessApplication",
          description: "Calculate Monthly Recurring Revenue (MRR) for SaaS startups dynamically.",
        },
        keywords: [
          "MRR Calculator",
          "SaaS revenue calculator",
          "monthly recurring revenue",
          "SaaS pricing model",
        ],
        h1: "Calculate and scale your Monthly Recurring Revenue (MRR)",
        body: "Input your customer count, contract sizes, and annual pricing tier discounts to see your blended MRR. Real-time updates help founders run scenarios on how adding 100 new signups affects net cash flow.",
      },
      runway: {
        title: "SaaS Runway and Burn Rate Calculator",
        description:
          "Estimate how many months of cash runway your SaaS startup has left. Monitor monthly burn rate, team payroll expenses, and cloud server hosting fees.",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "SaaS Runway Calculator",
          operatingSystem: "All",
          applicationCategory: "BusinessApplication",
          description: "SaaS Startup runway calculator for cash burn.",
        },
        keywords: [
          "runway calculator",
          "startup burn rate",
          "cash runway",
          "SaaS survival metrics",
        ],
        h1: "Track cash runway and monthly burn rates",
        body: "Input starting cash balances, marketing spend, and team salaries. The calculator outlines your exact survival timeline in months, advising you when to raise funds or cut server bills.",
      },
      ltv: {
        title: "SaaS Customer Lifetime Value (LTV) Calculator",
        description:
          "Compute your blended Customer Lifetime Value (LTV) using ARPU and monthly churn rate benchmarks.",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "SaaS LTV Calculator",
          operatingSystem: "All",
          applicationCategory: "BusinessApplication",
          description: "LTV calculation utility for software startups.",
        },
        keywords: ["LTV calculator", "customer lifetime value", "SaaS LTV", "churn rate metrics"],
        h1: "Maximize Customer Lifetime Value (LTV)",
        body: "LTV calculates how much value a user generates before churning. Reduce churn by 50% using our simulator and watch your LTV compound instantly.",
      },
      suite: {
        title: "SaaS Financial Unit Economics Calculator Suite",
        description:
          "Model your cost-per-user, payments fees, payroll, and growth forecast with 2026 industry benchmarks.",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "SaaS Financial Intelligence Calculator Suite",
          operatingSystem: "All",
          applicationCategory: "BusinessApplication",
          description: "Unified dashboard to calculate SaaS margins and cloud costs.",
        },
        keywords: [
          "SaaS pricing calculator",
          "unit economics",
          "cloud cost engine",
          "SaaS profit estimator",
        ],
        h1: "Enterprise-grade SaaS Financial Operating System",
        body: "Model raw infrastructure costs (AWS, Cloudflare, Supabase) alongside transactional services (Stripe, Twilio) to find your true Gross Margin.",
      },
    },
  },
};
