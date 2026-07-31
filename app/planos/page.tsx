import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { planTypes } from "@/lib/plans-data";

export const metadata: Metadata = {
  title: "Tipos de plano de saúde",
  description: "Entenda as diferenças entre plano individual, familiar, empresarial e MEI.",
};

export default function PlanosPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold">Tipos de plano de saúde</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Cada modalidade tem regras diferentes de contratação, carência e
        reajuste. Veja qual se encaixa na sua situação.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {planTypes.map((plan) => (
          <Link key={plan.slug} href={`/planos/${plan.slug}`}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <p className="text-lg font-semibold">{plan.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{plan.summary}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
