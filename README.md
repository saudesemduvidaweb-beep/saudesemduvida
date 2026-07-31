# Saúde Sem Dúvida (saudesemduvida.com.br)

Site de geração de leads pra plano de saúde. Não vende plano — encaminha
cotações pra uma corretora parceira registrada na ANS. Next.js 15 + React 19
+ TypeScript + Tailwind + shadcn/ui + Sanity CMS + Vercel.

## Status

Projeto scaffolded — estrutura completa de páginas, formulário de lead e
blog já estão no código. Falta rodar localmente, configurar as contas de
serviço (Sanity, Resend, Vercel) e testar antes do deploy.

## 1. Instalar dependências

```bash
npm install
```

## 2. Configurar variáveis de ambiente

Copie `.env.example` pra `.env.local` e preencha:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`: criar um
  projeto grátis em sanity.io/manage → "Create new project" → dataset
  `production`.
- `RESEND_API_KEY`: criar conta em resend.com → API Keys. É o serviço que
  envia o e-mail de notificação de lead.
- `LEAD_NOTIFICATION_EMAIL`: o e-mail que vai **receber** os leads. Assim
  que você criar o Gmail do projeto, coloca ele aqui — é pra onde os leads
  do formulário de cotação vão cair. Como ainda não tem WhatsApp
  configurado, todo lead chega só por e-mail (via Resend) por enquanto; dá
  pra adicionar envio por WhatsApp depois em `app/api/lead/route.ts` sem
  precisar mexer no resto do site.
- `NEXT_PUBLIC_SITE_URL`: deixar `https://saudesemduvida.com.br` (usado no
  sitemap e metadata).

Importante: pra `resend.emails.send` funcionar em produção, o domínio
`saudesemduvida.com.br` precisa ser verificado dentro do Resend (Domains →
Add Domain → adicionar os registros DNS que eles pedem). Sem isso, o envio
de e-mail falha.

## 3. Rodar localmente

```bash
npm run dev
```

Site em `http://localhost:3000`. Studio do Sanity (onde você escreve os
posts do blog) em `http://localhost:3000/studio`.

## 4. Blog / calendário editorial

Cada post tem um campo `publishedAt`. Um post com data futura fica salvo no
Sanity mas **não aparece no site** até a data chegar — a query
(`lib/queries.ts`) filtra por `publishedAt <= now()`. As páginas do blog
revalidam a cada 1h (`revalidate = 3600`), então não precisa rebuild manual
pra um post agendado aparecer.

## 5. Deploy na Vercel

1. Subir o projeto pro GitHub.
2. Importar o repo na Vercel (vercel.com/new).
3. Adicionar as mesmas variáveis do `.env.local` nas Environment Variables
   do projeto na Vercel.
4. Deploy.
5. Domains → adicionar `saudesemduvida.com.br` e apontar o DNS conforme a
   Vercel indicar (geralmente um registro A ou CNAME no registro.br).

## 6. Próximos passos sugeridos

- Testar o formulário de `/cotacao` de ponta a ponta (preencher → conferir
  se o e-mail chega no Gmail do projeto).
- Escrever os primeiros posts do blog direto no `/studio`.
- Quando o WhatsApp da corretora estiver pronto, decidir: notificação
  também por WhatsApp (via API do WhatsApp Business ou Twilio) e/ou trocar
  o CTA do formulário pra abrir uma conversa direta.
- Rodar `npm run lint` e `npm run typecheck` antes do primeiro deploy.
