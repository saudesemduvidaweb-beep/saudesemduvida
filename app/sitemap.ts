import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { postsListQuery } from "@/lib/queries";
import { planTypes } from "@/lib/plans-data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saudesemduvida.com.br";

// Regenera o sitemap no maximo 1x por hora (ISR), em vez de ficar
// congelado no snapshot do ultimo deploy. Assim, conforme cada post
// agendado atinge a data de publicacao, ele entra no sitemap sozinho,
// sem precisar de novo deploy.
export const revalidate = 3600;

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
