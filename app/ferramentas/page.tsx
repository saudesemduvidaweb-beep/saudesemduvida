import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Ferramentas gratuitas",
  description: "Recursos gratuitos pra te ajudar a entender plano de saúde antes de pedir uma cotação.",
};

const ferramentas = [
  {
    title: "Simulador de faixa de preço",
    description: "Estimativa ilustrativa com base em idade, cidade e tipo de plano.",
    href: "/ferramentas/simulador",
  },
  {
    title: "Carência por tipo de plano",
    description: "Prazos máximos de carência permitidos pela ANS.",
    href: "/ferramentas/carencia",
  },
  {
    title: "Calculadora de reajuste",
    description: "Calcule o novo valor da mensalidade a partir do percentual de reajuste.",
    href: "/ferramentas/reajuste",
  },
  {
    title: "Checklist de contratação",
    description: "O que separar antes de contratar um plano de saúde.",
    href: "/ferramentas/checklist",
  },
];

export default function FerramentasPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold">Ferramentas gratuitas</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Recursos pra te ajudar a se organizar antes de pedir uma cotação.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {ferramentas.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <p className="text-lg font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
