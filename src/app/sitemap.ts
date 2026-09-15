import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const paths = ["/", "/about", "/categories", "/services", "/global-distribution", "/partners", "/contact", "/privacy-policy", "/terms"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

