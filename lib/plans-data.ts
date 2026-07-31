export type PlanType = {
  slug: string;
  title: string;
  summary: string;
  publico: string;
  pontos: string[];
};

export const planTypes: PlanType[] = [
  {
    slug: "individual",
    title: "Plano individual",
    summary:
      "Contratado por uma única pessoa, direto com a operadora ou administradora de benefícios.",
    publico: "Quem busca cobertura só pra si, sem depender de um CNPJ ou grupo familiar.",
    pontos: [
      "Reajuste anual segue índice definido pela ANS pra planos individuais",
      "Tem menos opções de operadora disponíveis que o plano empresarial",
      "Carência se aplica conforme regra da ANS, salvo portabilidade",
    ],
  },
  {
    slug: "familiar",
    title: "Plano familiar",
    summary: "Cobertura pra você e dependentes (cônjuge, filhos) numa mesma apólice.",
    publico: "Famílias que preferem centralizar a cobertura de todo mundo num plano só.",
    pontos: [
      "Mensalidade calculada por faixa etária de cada dependente",
      "Inclusão de novo dependente (ex: recém-nascido) tem regras próprias de carência",
      "Mesma lógica de reajuste anual da ANS do plano individual",
    ],
  },
  {
    slug: "empresarial",
    title: "Plano empresarial (PME)",
    summary: "Contratado por uma empresa (CNPJ) pra cobrir funcionários e, em alguns casos, dependentes.",
    publico: "Pequenas e médias empresas que querem oferecer benefício de saúde ao time.",
    pontos: [
      "Costuma ter mensalidade menor que o plano individual equivalente",
      "Reajuste é definido em negociação com a operadora, não pelo índice ANS de individual",
      "Geralmente exige número mínimo de vidas (varia por operadora)",
    ],
  },
  {
    slug: "mei",
    title: "Plano MEI",
    summary: "Modalidade empresarial pensada pra microempreendedores individuais com CNPJ ativo.",
    publico: "Autônomos e microempreendedores que normalmente não teriam acesso a plano PME.",
    pontos: [
      "Exige CNPJ de MEI ativo — geralmente sem tempo mínimo de abertura, varia por operadora",
      "Costuma ser mais barato que plano individual equivalente",
      "Nem toda operadora aceita MEI com um único titular — mudou de operadora pra operadora",
    ],
  },
];

export function getPlanBySlug(slug: string) {
  return planTypes.find((plan) => plan.slug === slug);
}
