export const siteConfig = {
  name: "Saúde Sem Dúvida",
  domain: "saudesemduvida.com.br",
  description:
    "Compare planos de saúde individuais, familiares, empresariais e MEI com clareza. Cotação gratuita com uma corretora parceira registrada.",
  ctaLabel: "Solicitar cotação gratuita",
  ctaHref: "/cotacao",
};

export const mainNav = [
  { title: "Como funciona", href: "/como-funciona" },
  {
    title: "Tipos de plano",
    href: "/planos",
    children: [
      { title: "Individual", href: "/planos/individual" },
      { title: "Familiar", href: "/planos/familiar" },
      { title: "Empresarial (PME)", href: "/planos/empresarial" },
      { title: "MEI", href: "/planos/mei" },
    ],
  },
  { title: "Comparativo de operadoras", href: "/comparativo" },
  {
    title: "Ferramentas gratuitas",
    href: "/ferramentas",
    children: [
      { title: "Simulador de faixa de preço", href: "/ferramentas/simulador" },
      { title: "Carência por tipo de plano", href: "/ferramentas/carencia" },
      { title: "Calculadora de reajuste ANS", href: "/ferramentas/reajuste" },
      { title: "Checklist de contratação", href: "/ferramentas/checklist" },
    ],
  },
  { title: "Blog", href: "/blog" },
];

// Texto de compliance: o site NAO vende plano nem substitui a corretora.
// Nao remover ou suavizar sem revisar a obrigacao legal (ANS).
export const complianceNote =
  "Saúde Sem Dúvida é um canal de informação e geração de indicação para uma corretora parceira registrada na ANS. Não somos operadora de plano de saúde e não fechamos contratos — a cotação, aprovação e contratação são feitas diretamente com a corretora responsável.";
