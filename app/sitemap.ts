import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { postsListQuery } from "@/lib/queries";
import { planTypes } from "@/lib/plans-data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saudesemduvida.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/como-funciona",
    "/planos",
    "/comparativo",
    "/ferramentas",
    "/ferramentas/simulador",
    "/ferramentas/carencia",
    "/ferramentas/reajuste",
    "/ferramentas/checklist",
    "/blog",
    "/cotacao",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const planRoutes = planTypes.map((plan) => ({
    url: `${baseUrl}/planos/${plan.slug}`,
    lastModified: new Date(),
  }));

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await client.fetch<{ slug: { current: string }; publishedAt: string }[]>(
      postsListQuery
    );
    postRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
    }));
  } catch {
    // Sanity ainda nao configurado no ambiente - sitemap segue so com rotas estaticas
  }

  return [...staticRoutes, ...planRoutes, ...postRoutes];
}
