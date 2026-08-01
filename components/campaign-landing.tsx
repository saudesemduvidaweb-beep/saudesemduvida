import { WhatsAppCta } from "@/components/whatsapp-cta";
import { WhatsAppSticky } from "@/components/whatsapp-sticky";
import { Logo } from "@/components/logo";
import { complianceNote } from "@/lib/site-config";

const trustPoints = [
  "Cotação 100% gratuita, sem compromisso",
  "Resposta rápida, direto no seu WhatsApp",
  "Corretora parceira registrada na ANS",
  "Sem letra miúda: você decide se contrata",
];

const steps = [
  {
    n: "1",
    title: "Você chama no WhatsApp",
    text: "Clica no botão e manda a mensagem, já pronta pra enviar.",
  },
  {
    n: "2",
    title: "Conta sua necessidade",
    text: "Idade, cidade e o tipo de plano que você procura.",
  },
  {
    n: "3",
    title: "Recebe as opções",
    text: "A corretora parceira te manda as opções, sem compromisso.",
  },
];

export function CampaignLanding({ campaignRef }: { campaignRef?: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-muted/50 to-background px-6 py-12 pb-24 sm:pb-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-2">
          <Logo />
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 1.5a1 1 0 0 1 .45.11l6 3A1 1 0 0 1 17 5.5v4c0 4.14-2.68 7.72-7 8.94-4.32-1.22-7-4.8-7-8.94v-4a1 1 0 0 1 .55-.89l6-3A1 1 0 0 1 10 1.5zm2.7 5.79-3.2 3.2-1.2-1.2a1 1 0 1 0-1.4 1.42l1.9 1.9a1 1 0 0 0 1.42 0l3.9-3.9a1 1 0 0 0-1.42-1.42z"
                clipRule="evenodd"
              />
            </svg>
            Corretora parceira registrada na ANS
          </span>
        </div>

        <h1 className="mt-5 text-center text-3xl font-bold leading-tight">
          Peça sua cotação de plano de saúde agora, direto no WhatsApp
        </h1>
        <p className="mt-3 text-center text-base text-muted-foreground">
          Fale com nossa corretora parceira sem sair de casa. Resposta rápida
          e sem compromisso.
        </p>

        <div className="mt-8">
          <WhatsAppCta campaignRef={campaignRef} />
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

        <div className="mt-10 rounded-lg border border-border bg-background/60 p-5">
          <p className="text-center text-sm font-semibold">Como funciona</p>
          <div className="mt-4 space-y-4">
            {steps.map((step) => (
              <div key={step.n} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {step.n}
                </span>
                <div>
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <WhatsAppCta campaignRef={campaignRef} label="Quero minha cotação grátis" />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {complianceNote}
        </p>
      </div>

      <WhatsAppSticky campaignRef={campaignRef} />
    </div>
  );
}
