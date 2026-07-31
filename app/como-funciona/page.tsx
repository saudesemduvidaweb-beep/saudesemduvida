import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { complianceNote, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Como funciona",
  description: "Entenda o papel do Saúde Sem Dúvida e da corretora parceira no processo de contratação do seu plano.",
};

const passos = [
  {
    title: "1. Você conta sua necessidade",
    description:
      "Preenche o formulário de cotação com idade, cidade e tipo de plano que procura.",
  },
  {
    title: "2. A corretora parceira entra em contato",
    description:
      "Uma corretora registrada na ANS analisa opções entre as operadoras parceiras (Amil, Bradesco Saúde, SulAmérica, Hapvida, NotreDame Intermédica, Unimed, entre outras).",
  },
  {
    title: "3. Você recebe as opções e decide",
    description:
      "A cotação final, aprovação e contratação acontecem direto com a corretora — o site não fecha contrato nem garante preço ou aprovação.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="container max-w-3xl py-16">
      <h1 className="text-3xl font-bold">Como funciona</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        {siteConfig.name} não vende plano de saúde. Ajudamos você a entender
        as opções e conectamos com uma corretora parceira que fecha a
        contratação.
      </p>

      <div className="mt-10 space-y-6">
        {passos.map((passo) => (
          <Card key={passo.title}>
            <p className="font-semibold">{passo.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{passo.description}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-10 bg-muted/40">
        <p className="text-sm leading-relaxed text-muted-foreground">{complianceNote}</p>
      </Card>

      <Button size="lg" className="mt-10" asChild>
        <Link href={siteConfig.ctaHref}>{siteConfig.ctaLabel}</Link>
      </Button>
    </div>
  );
}
