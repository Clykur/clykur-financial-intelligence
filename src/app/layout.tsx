import { Inter, Space_Grotesk } from "next/font/google";
import "@/styles.css";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";

import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata = {
  title: "LedgerOS — SaaS Financial Intelligence Platform",

  description:
    "The AI-powered financial operating system for SaaS founders. Optimize pricing, forecast growth, compare cloud costs, analyze unit economics, calculate runway, and build a more profitable SaaS.",

  authors: [
    {
      name: "LedgerOS",
    },
  ],

  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },

  openGraph: {
    title: "LedgerOS — SaaS Financial Intelligence Platform",
    description:
      "Plan pricing, forecast revenue, optimize cloud costs, analyze unit economics, and make smarter financial decisions with AI.",
    type: "website",
    siteName: "LedgerOS",
  },

  twitter: {
    card: "summary_large_image",
    title: "LedgerOS — SaaS Financial Intelligence Platform",
    description:
      "Financial intelligence for SaaS founders. Pricing, forecasting, runway, cloud cost optimization, and AI-powered business insights.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LedgerOS",
    url: "https://ledgeros.com",
    logo: "https://ledgeros.com/icon.png",
    description: "SaaS Financial Intelligence Platform",
    sameAs: ["https://twitter.com/ledgeros", "https://linkedin.com/company/ledgeros"],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LedgerOS Financial Intelligence",
    operatingSystem: "Any",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body
        className="antialiased bg-background text-foreground min-h-screen flex flex-col overflow-x-hidden"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
