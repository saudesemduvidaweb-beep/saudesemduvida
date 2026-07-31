import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Checklist pra contratar um plano",
  description: "O que separar antes de contratar um plano de saúde individual, familiar, empresarial ou MEI.",
};

const grupos = [
  {
    titulo: "Todo mundo precisa",
    itens: ["RG e CPF", "Comprovante de residência atualizado", "Cartão Nacional de Saúde (CNS), se tiver"],
  },
  {
    titulo: "Plano familiar — além do titular",
    itens: ["Documentos dos dependentes", "Certidão de casamento ou união estável (se aplicável)", "Certidão de nascimento dos filhos"],
  },
  {
    titulo: "Plano empresarial / PME",
    itens: ["CNPJ ativo e contrato social", "Relação de funcionários a incluir", "Guia de recolhimento do FGTS ou folha de pagamento (pode ser exigido)"],
  },
  {
    titulo: "Plano MEI",
    itens: ["CNPJ de MEI ativo", "Documento pessoal do titular", "Comprovante de residência"],
  },
];

export default function ChecklistPage() {
  return (
    <div className="container max-w-3xl py-16">
      <h1 className="text-3xl font-bold">Checklist pra contratar</h1>
      <p className="mt-4 text-muted-foreground">
        Documentos podem variar por operadora — esta lista cobre o que
        costuma ser pedido na maioria dos casos.
      </p>

      <div className="mt-8 space-y-6">
        {grupos.map((grupo) => (
          <Card key={grupo.titulo}>
            <p className="font-medium">{grupo.titulo}</p>
            <ul className="mt-3 space-y-2">
              {grupo.itens.map((item) => (
                <li key={item} className="text-sm text-muted-foreground">
                  ☐ {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
