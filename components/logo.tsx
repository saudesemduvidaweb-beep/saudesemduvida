import { cn } from "@/lib/utils";

// Icone: escudo com check - remete a "sem duvida" (certeza/confianca) e a
// protecao (plano de saude). Usa a mesma cor --primary do resto do site.
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 shrink-0 text-primary"
        aria-hidden="true"
      >
        <path
          d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
          fill="currentColor"
        />
        <path
          d="M7 12l3 3 7-7"
          fill="none"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-lg font-semibold leading-none">
        Saúde <span className="text-primary">Sem Dúvida</span>
      </span>
    </span>
  );
}
