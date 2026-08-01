"use client";

import { buildWhatsAppLink } from "@/lib/site-config";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function WhatsAppCta({
  campaignRef,
  label = "Falar no WhatsApp agora",
}: {
  campaignRef?: string;
  label?: string;
}) {
  function handleClick() {
    // Prepara o terreno pra quando o Google Ads Conversion Tag for
    // instalado no site - o evento ja sai daqui, so falta o tag existir
    // pra capturar. Nao quebra nada enquanto o tag nao existe.
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: "whatsapp_click", campaign_ref: campaignRef ?? "direto" });
    }
  }

  return (
    <a
      href={buildWhatsAppLink(campaignRef)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-8 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#1ebe57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1ebe57]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.12h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.25-8.24 8.25zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.08 0 1.23.89 2.42 1.02 2.59.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29z" />
      </svg>
      {label}
    </a>
  );
}
