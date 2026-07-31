"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TipoPlano = "individual" | "familiar" | "empresarial" | "mei";

// Multiplicadores ilustrativos, NAO sao tabela de preco real de nenhuma operadora.
// Servem so pra dar uma nocao de ordem de grandeza antes da cotacao real.
const BASE_POR_TIPO: Record<TipoPlano, number> = {
  individual: 450,
  familiar: 380,
  empresarial: 260,
  mei: 300,
};

function calcularFaixa(idade: number, tipo: TipoPlano) {
  const base = BASE_POR_TIPO[tipo];
  const fatorIdade = idade < 30 ? 1 : idade < 45 ? 1.3 : idade < 60 ? 1.8 : 2.4;
  const valorCentral = base * fatorIdade;
  return {
    min: Math.round(valorCentral * 0.85),
    max: Math.round(valorCentral * 1.25),
  };
}

export default function SimuladorPage() {
  const [idade, setIdade] = useState("30");
  const [cidade, setCidade] = useState("");
  const [tipo, setTipo] = useState<TipoPlano>("individual");
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const faixa = useMemo(
    () => calcularFaixa(Number(idade) || 0, tipo),
    [idade, tipo]
  );

  return (
    <div className="container max-w-2xl py-16">
      <h1 className="text-3xl font-bold">Simulador de faixa de preço</h1>
      <p className="mt-3 text-muted-foreground">
        Estimativa ilustrativa pra você ter uma noção de ordem de grandeza.
        Não é uma cotação fechada — o valor real depende da operadora, da
        cidade exata e das condições de saúde declaradas.
      </p>

      <Card className="mt-8">
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setMostrarResultado(true);
          }}
        >
          <div>
            <Label htmlFor="idade">Idade</Label>
            <Input
              id="idade"
              type="number"
              min={0}
              max={120}
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="cidade">Cidade</Label>
            <Input
              id="cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className="mt-1"
              placeholder="Ex: São Paulo - SP"
              required
            />
          </div>

          <div>
            <Label htmlFor="tipo">Tipo de plano</Label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoPlano)}
              className="mt-1 flex h-11 w-full rounded-md border border-border bg-background px-3 text-sm"
            >
              <option value="individual">Individual</option>
              <option value="familiar">Familiar</option>
              <option value="empresarial">Empresarial (PME)</option>
              <option value="mei">MEI</option>
            </select>
          </div>

          <Button type="submit" size="lg">
            Ver estimativa
          </Button>
        </form>

        {mostrarResultado && (
          <div className="mt-8 rounded-md border border-border bg-muted/40 p-5">
            <p className="text-sm text-muted-foreground">Faixa estimada em {cidade || "sua cidade"}:</p>
            <p className="mt-1 text-2xl font-semibold">
              R$ {faixa.min} – R$ {faixa.max} / mês
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Estimativa ilustrativa, não é cotação. Peça uma cotação real e
              gratuita com nossa corretora parceira pra saber o valor exato.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
