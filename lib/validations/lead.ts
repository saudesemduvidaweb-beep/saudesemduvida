import { z } from "zod";

export const leadSchema = z.object({
  nome: z.string().min(2, "Informe seu nome completo"),
  email: z.string().email("E-mail inválido"),
  telefone: z
    .string()
    .min(10, "Informe um telefone com DDD")
    .max(15, "Telefone inválido"),
  cidade: z.string().min(2, "Informe sua cidade"),
  tipoPlano: z.enum(["individual", "familiar", "empresarial", "mei"], {
    errorMap: () => ({ message: "Selecione o tipo de plano" }),
  }),
  mensagem: z.string().max(500).optional(),
  // honeypot anti-spam: campo escondido no form, bot preenche, humano nao
  website: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
