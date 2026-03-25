import type { MetadataRoute } from "next";

import { getContentLastModified } from "@/lib/content-meta";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    {
      url: base,
      lastModified: getContentLastModified(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
