// Rate limit simples em memoria (janela deslizante), por IP.
// Suficiente pra MVP de instancia unica (Vercel Hobby). Se escalar pra
// multiplas instancias/regioes, trocar por um store compartilhado
// (ex: Upstash Redis) pra o limite valer entre instancias.

type Entry = { count: number; resetAt: number };

const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS = 5;

const hits = new Map<string, Entry>();

export function checkRateLimit(identifier: string) {
  const now = Date.now();
  const entry = hits.get(identifier);

  if (!entry || now > entry.resetAt) {
    hits.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}
