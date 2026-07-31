"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ReajustePage() {
  const [valorAtual, setValorAtual] = useState("500");
  const [percentual, setPercentual] = useState("");

  const novoValor = useMemo(() => {
    const valor = Number(valorAtual) || 0;
    const pct = Number(percentual) || 0;
    return valor * (1 + pct / 100);
  }, [valorAtual, percentual]);

  return (
    <div className="container max-w-2xl py-16">
      <h1 className="text-3xl font-bold">Calculadora de reajuste</h1>
      <p className="mt-3 text-muted-foreground">
        Informe sua mensalidade atual e o percentual de reajuste comunicado
        pela sua operadora (ou o índice publicado pela ANS pro seu tipo de
        plano) pra ver o novo valor.
      </p>

      <Card className="mt-8 space-y-5">
        <div>
          <Label htmlFor="valorAtual">Mensalidade atual (R$)</Label>
          <Input
            id="valorAtual"
            type="number"
            min={0}
            value={valorAtual}
            onChange={(e) => setValorAtual(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="percentual">Percentual de reajuste (%)</Label>
          <Input
            id="percentual"
            type="number"
            step="0.01"
            value={percentual}
            onChange={(e) => setPercentual(e.target.value)}
            className="mt-1"
            placeholder="Ex: 6.91"
          />
        </div>

        <div className="rounded-md border border-border bg-muted/40 p-5">
          <p className="text-sm text-muted-foreground">Novo valor estimado:</p>
          <p className="mt-1 text-2xl font-semibold">
            R$ {novoValor.toFixed(2)}
          </p>
        </div>

        <p className="text-xs text-muted-foreground">
          O percentual de reajuste de planos individuais/familiares é
          divulgado anualmente pela ANS e varia por operadora dentro desse
          teto; planos empresariais seguem percentual negociado com cada
          operadora. Confirme o índice correto no comunicado da sua operadora
          ou no site da ANS antes de usar esta calculadora.
        </p>
      </Card>
    </div>
  );
}
