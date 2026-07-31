import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validations/lead";
import { checkRateLimit } from "@/lib/rate-limit";
import { resend } from "@/lib/resend";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const rate = checkRateLimit(ip);

  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em alguns minutos." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Honeypot: se o campo escondido veio preenchido, e bot -> descarta
  // silenciosamente sem avisar (nao entrega sinal pro bot).
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { nome, email, telefone, cidade, tipoPlano, mensagem } = parsed.data;

  const notifyTo = process.env.LEAD_NOTIFICATION_EMAIL;
  if (!notifyTo) {
    console.error("LEAD_NOTIFICATION_EMAIL nao configurado no .env");
    return NextResponse.json(
      { error: "Erro de configuração no servidor" },
      { status: 500 }
    );
  }

  try {
    await resend.emails.send({
      from: "Saúde Sem Dúvida <leads@saudesemduvida.com.br>",
      to: notifyTo,
      replyTo: email,
      subject: `Novo lead: ${nome} (${tipoPlano})`,
      text: [
        `Nome: ${nome}`,
        `E-mail: ${email}`,
        `Telefone: ${telefone}`,
        `Cidade: ${cidade}`,
        `Tipo de plano: ${tipoPlano}`,
        `Mensagem: ${mensagem || "-"}`,
      ].join("\n"),
    });
  } catch (error) {
    console.error("Falha ao enviar notificação de lead:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar sua solicitação. Tente novamente." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
