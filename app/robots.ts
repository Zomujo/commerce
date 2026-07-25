import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.wgtradeafrica.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/supplier/", "/login", "/quotes/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
