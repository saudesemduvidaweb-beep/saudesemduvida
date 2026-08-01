import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saudesemduvida.com.br";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio", "/campanha", "/lp"] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
