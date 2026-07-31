import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPlanBySlug, planTypes } from "@/lib/plans-data";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return planTypes.map((plan) => ({ slug: plan.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plan = getPlanBySlug(slug);
  if (!plan) return {};
  return {
    title: plan.title,
    description: plan.summary,
  };
}

export default async function PlanoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plan = getPlanBySlug(slug);
  if (!plan) notFound();

  return (
    <div className="container max-w-3xl py-16">
      <h1 className="text-3xl font-bold">{plan.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{plan.summary}</p>

      <p className="mt-8 font-medium">Pra quem é</p>
      <p className="mt-2 text-muted-foreground">{plan.publico}</p>

      <p className="mt-8 font-medium">O que saber antes de contratar</p>
      <ul className="mt-2 space-y-2">
        {plan.pontos.map((ponto) => (
          <li key={ponto} className="text-muted-foreground">
            • {ponto}
          </li>
        ))}
      </ul>

      <Button size="lg" className="mt-10" asChild>
        <Link href={siteConfig.ctaHref}>{siteConfig.ctaLabel}</Link>
      </Button>
    </div>
  );
}
