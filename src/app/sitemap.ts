import type { MetadataRoute } from "next";

const baseUrl = "https://ledgeros.com";

const routes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/product", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/solutions", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/pricing", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/company", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/docs", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/app", priority: 0.95, changeFrequency: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
