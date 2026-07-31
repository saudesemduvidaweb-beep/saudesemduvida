import { siteConfig } from "@/lib/site-config";

// JSON-LD generico do site (Organization). Injetar em paginas especificas
// (ex: post do blog com Article) conforme necessario.
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: `https://${siteConfig.domain}`,
    description: siteConfig.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
