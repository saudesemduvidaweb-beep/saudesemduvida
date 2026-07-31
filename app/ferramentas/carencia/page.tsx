import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Carência por tipo de plano",
  description: "Prazos máximos de carência definidos pela ANS pra planos de saúde.",
};

const carencias = [
  { situacao: "Urgência e emergência", prazoMaximo: "24 horas" },
  { situacao: "Consultas, exames simples e internações em geral", prazoMaximo: "Até 180 dias" },
  { situacao: "Parto a termo", prazoMaximo: "Até 300 dias" },
  {
    situacao: "Cobertura Parcial Temporária (CPT) por doença ou lesão preexistente",
    prazoMaximo: "Até 24 meses (restrita a procedimentos de alta complexidade ligados à condição preexistente)",
  },
];

export default function CarenciaPage() {
  return (
    <div className="container max-w-3xl py-16">
      <h1 className="text-3xl font-bold">Carência por tipo de plano</h1>
      <p className="mt-4 text-muted-foreground">
        A ANS define prazos <strong>máximos</strong> de carência que uma
        operadora pode exigir. Cada operadora pode praticar prazos iguais ou
        menores — nunca maiores que o teto abaixo.
      </p>

      <div className="mt-8 space-y-4">
        {carencias.map((item) => (
          <Card key={item.situacao}>
            <p className="font-medium">{item.situacao}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Prazo máximo: {item.prazoMaximo}
            </p>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-muted/40">
        <p className="text-sm text-muted-foreground">
          Quem já tem plano há mais de dois anos pode ter direito à
          portabilidade de carências ao trocar de operadora, dispensando
          cumprir esses prazos de novo — as regras exatas de elegibilidade
          devem ser confirmadas com a corretora ou diretamente na ANS.
        </p>
      </Card>
    </div>
  );
}
