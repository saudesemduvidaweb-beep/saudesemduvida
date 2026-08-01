import type { Metadata } from "next";
import { CampaignLanding } from "@/components/campaign-landing";

export const metadata: Metadata = {
  title: "Cotação gratuita de plano de saúde",
  robots: { index: false, follow: false }, // pagina de campanha nao deve ranquear organicamente
};

// URL curta pra usar direto no Google Ads: saudesemduvida.com.br/lp
// Aceita ?ref=nome-da-campanha opcional, que entra na mensagem do
// WhatsApp pra identificar de qual anuncio veio o lead. Sem ?ref, funciona
// normal, so sem essa etiqueta na mensagem.
export default async function LpPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  return <CampaignLanding campaignRef={ref} />;
}
