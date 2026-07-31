import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { OrganizationJsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://saudesemduvida.com.br"
  ),
  title: {
    default: `${siteConfig.name} — Compare planos de saúde com clareza`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  verification: {
    google: "SaNUA6Ep-JSlYQ5fE4ONv4vFMfWfMEB35bbj877h-to",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col antialiased">
        <OrganizationJsonLd />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
