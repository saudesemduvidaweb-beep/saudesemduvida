"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Paginas de campanha paga (/campanha/*) sao isoladas: sem menu, sem
// footer, sem link de saida - foco total na conversao.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isIsolatedPage =
    pathname?.startsWith("/campanha") || pathname?.startsWith("/studio");

  if (isIsolatedPage) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
