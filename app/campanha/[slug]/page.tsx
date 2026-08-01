import type { Metadata } from "next";
import { CampaignLanding } from "@/components/campaign-landing";

export const metadata: Metadata = {
  title: "Cotação gratuita de plano de saúde",
  robots: { index: false, follow: false }, // paginas de campanha nao devem ranquear organicamente
};

export default async function CampanhaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CampaignLanding campaignRef={slug} />;
}
