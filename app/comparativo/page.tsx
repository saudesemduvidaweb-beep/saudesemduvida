import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparativo de operadoras",
  description: "Conteúdo informativo sobre as principais operadoras de plano de saúde do Brasil.",
};

const operadoras = [
  {
    nome: "Amil",
    perfil: "Ampla rede em capitais, forte em planos empresariais e individuais.",
  },
  {
    nome: "Bradesco Saúde",
    perfil: "Rede referenciada extensa, tradicional em planos empresariais de médio/grande porte.",
  },
  {
    nome: "SulAmérica",
    perfil: "Boa presença em planos individuais e empresariais, rede nacional.",
  },
  {
    nome: "Hapvida",
    perfil: "Modelo verticalizado (rede própria), forte presença no Norte/Nordeste.",
  },
  {
    nome: "NotreDame Intermédica",
    perfil: "Também verticalizada, forte em São Paulo e outras capitais do Sudeste.",
  },
  {
    nome: "Unimed",
    perfil: "Sistema cooperativo com unidades regionais — cobertura varia por cidade/estado.",
  },
];

export default function ComparativoPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold">Comparativo de operadoras</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Conteúdo informativo pra você conhecer o perfil geral de cada
        operadora. Preço, rede credenciada e condições exatas variam por
        cidade e devem ser confirmados na cotação com a corretora parceira —
        isso aqui não é oferta de venda.
      </p>

      <div className="mt-10 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 font-medium">Operadora</th>
              <th className="p-4 font-medium">Perfil geral</th>
            </tr>
          </thead>
          <tbody>
            {operadoras.map((op) => (
              <tr key={op.nome} className="border-t border-border">
                <td className="p-4 font-medium">{op.nome}</td>
                <td className="p-4 text-muted-foreground">{op.perfil}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
