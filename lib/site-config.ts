export const siteConfig = {
  name: "Saúde Sem Dúvida",
  domain: "saudesemduvida.com.br",
  description:
    "Compare planos de saúde individuais, familiares, empresariais e MEI com clareza. Cotação gratuita com uma corretora parceira registrada.",
  ctaLabel: "Solicitar cotação gratuita",
  ctaHref: "/cotacao",
};

// Numero de WhatsApp que recebe os leads das landing pages de campanha
// (Google Ads etc.). Formato internacional sem espacos/simbolos.
export const whatsappNumber = "5562991547627";

// Monta o link do WhatsApp com mensagem pre-preenchida. O parametro `ref`
// (opcional) entra no texto pra quem responder saber de qual campanha/anuncio
// o lead veio, sem precisar de nenhuma ferramenta de analytics.
export function buildWhatsAppLink(ref?: string) {
  const base = "Olá! Vim do anúncio do Saúde Sem Dúvida e quero uma cotação gratuita de plano de saúde.";
  const text = ref ? `${base} (ref: ${ref})` : base;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

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
