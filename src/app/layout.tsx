import { Inter, Sora } from "next/font/google";
import "@/styles.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata = {
  title: "Clykur — SaaS Financial Intelligence Platform",

  description:
    "The AI-powered financial operating system for SaaS founders. Optimize pricing, forecast growth, compare cloud costs, analyze unit economics, calculate runway, and build a more profitable SaaS.",

  authors: [
    {
      name: "Clykur",
    },
  ],

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "Clykur — SaaS Financial Intelligence Platform",
    description:
      "Plan pricing, forecast revenue, optimize cloud costs, analyze unit economics, and make smarter financial decisions with AI.",
    type: "website",
    siteName: "Clykur",
  },

  twitter: {
    card: "summary_large_image",
    title: "Clykur — SaaS Financial Intelligence Platform",
    description:
      "Financial intelligence for SaaS founders. Pricing, forecasting, runway, cloud cost optimization, and AI-powered business insights.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
