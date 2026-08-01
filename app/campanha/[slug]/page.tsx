import type { Metadata } from "next";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { complianceNote, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cotação gratuita de plano de saúde",
  robots: { index: false, follow: false }, // paginas de campanha nao devem ranquear organicamente
};

const trustPoints = [
  "Cotação 100% gratuita, sem compromisso",
  "Resposta rápida, direto no seu WhatsApp",
  "Corretora parceira registrada na ANS",
  "Sem letra miúda: você decide se contrata",
];

export default async function CampanhaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-6 py-12">
      <div className="w-full max-w-md">
        <p className="text-center text-lg font-semibold">{siteConfig.name}</p>

        <h1 className="mt-4 text-center text-3xl font-bold leading-tight">
          Peça sua cotação de plano de saúde agora, direto no WhatsApp
        </h1>
        <p className="mt-3 text-center text-base text-muted-foreground">
          Fale com nossa corretora parceira sem sair de casa. Resposta rápida
          e sem compromisso.
        </p>

        <div className="mt-8">
          <WhatsAppCta campaignRef={slug} />
        </div>

        <ul className="mt-8 space-y-3">
          {trustPoints.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <WhatsAppCta campaignRef={slug} label="Quero minha cotação grátis" />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {complianceNote}
        </p>
      </div>
    </div>
  );
}
