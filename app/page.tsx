import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { complianceNote, siteConfig } from "@/lib/site-config";

const publicos = [
  {
    title: "Individual ou familiar",
    description: "Você buscando o melhor plano pra sua situação ou sua família.",
    href: "/planos/individual",
  },
  {
    title: "Autônomo / MEI",
    description: "Planos PME costumam sair mais em conta que o individual.",
    href: "/planos/mei",
  },
  {
    title: "Pequena empresa",
    description: "Plano empresarial pros seus funcionários, com CNPJ.",
    href: "/planos/empresarial",
  },
  {
    title: "Já tenho plano e quero trocar",
    description: "Entenda como funciona a portabilidade de carências.",
    href: "/como-funciona",
  },
];

const ferramentas = [
  { title: "Simulador de faixa de preço", href: "/ferramentas/simulador" },
  { title: "Carência por tipo de plano", href: "/ferramentas/carencia" },
  { title: "Calculadora de reajuste ANS", href: "/ferramentas/reajuste" },
  { title: "Checklist pra contratar", href: "/ferramentas/checklist" },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="container flex flex-col items-start gap-6 py-20">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
            Entenda seu plano de saúde antes de decidir
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Compare opções de plano individual, familiar, empresarial e MEI
            com informação clara — sem jargão de seguradora, sem promessa
            vazia.
          </p>
          <Button size="lg" asChild>
            <Link href={siteConfig.ctaHref}>{siteConfig.ctaLabel}</Link>
          </Button>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="text-2xl font-semibold">Pra quem é</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {publicos.map((item) => (
            <Card key={item.href}>
              <p className="font-medium">{item.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
              >
                Saiba mais →
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="container py-16">
          <h2 className="text-2xl font-semibold">Ferramentas gratuitas</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Recursos pra você se organizar antes de pedir uma cotação —
            estimativas, não valores fechados.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ferramentas.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <p className="font-medium">{item.title}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <Card className="bg-muted/40">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {complianceNote}
          </p>
        </Card>
      </section>
    </>
  );
}
