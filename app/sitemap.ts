import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/our-services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about-us", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
