import type { MetadataRoute } from "next";

import { getContentLastModified } from "@/lib/content-meta";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

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
