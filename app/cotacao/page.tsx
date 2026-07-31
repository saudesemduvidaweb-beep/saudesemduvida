import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { complianceNote } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Solicitar cotação gratuita",
  description: "Preencha seus dados e receba uma cotação de plano de saúde da nossa corretora parceira.",
};

export default function CotacaoPage() {
  return (
    <div className="container max-w-xl py-16">
      <h1 className="text-3xl font-bold">Solicitar cotação gratuita</h1>
      <p className="mt-3 text-muted-foreground">
        Preencha seus dados. Nossa corretora parceira entra em contato por
        e-mail com as opções disponíveis pra você.
      </p>

      <div className="mt-8">
        <LeadForm />
      </div>

      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
        {complianceNote}
      </p>
    </div>
  );
}
