import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["GPTBot", "CCBot", "ClaudeBot", "PerplexityBot"],
        allow: "/",
      },
    ],
    sitemap: "https://ledgeros.com/sitemap.xml",
  };
}
