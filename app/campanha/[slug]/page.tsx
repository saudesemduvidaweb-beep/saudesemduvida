import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { complianceNote, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cotação gratuita de plano de saúde",
  robots: { index: false, follow: false }, // paginas de campanha nao devem ranquear organicamente
};

export default function CampanhaPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-16">
      <div className="w-full max-w-md">
        <p className="text-center text-lg font-semibold">{siteConfig.name}</p>
        <h1 className="mt-4 text-center text-2xl font-bold">
          Compare planos de saúde e peça sua cotação gratuita
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Preencha seus dados e receba as opções direto no seu e-mail.
        </p>

        <div className="mt-8 rounded-lg border border-border bg-background p-6 shadow-sm">
          <LeadForm />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {complianceNote}
        </p>
      </div>
    </div>
  );
}
