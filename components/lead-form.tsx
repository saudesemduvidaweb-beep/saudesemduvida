"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { leadSchema, type LeadInput } from "@/lib/validations/lead";

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
  });

  async function onSubmit(data: LeadInput) {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Não foi possível enviar. Tente de novo.");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Erro inesperado");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-border bg-muted/40 p-6">
        <p className="font-medium">Recebemos sua solicitação.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Nossa corretora parceira vai entrar em contato por e-mail em breve
          com as opções de plano pra você.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot anti-spam - fica invisivel pra usuario real */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...register("website")}
      />

      <div>
        <Label htmlFor="nome">Nome completo</Label>
        <Input id="nome" className="mt-1" {...register("nome")} />
        {errors.nome && (
          <p className="mt-1 text-xs text-red-600">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" className="mt-1" {...register("email")} />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="telefone">Telefone (com DDD)</Label>
        <Input id="telefone" className="mt-1" {...register("telefone")} />
        {errors.telefone && (
          <p className="mt-1 text-xs text-red-600">{errors.telefone.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="cidade">Cidade</Label>
        <Input id="cidade" className="mt-1" {...register("cidade")} />
        {errors.cidade && (
          <p className="mt-1 text-xs text-red-600">{errors.cidade.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="tipoPlano">Tipo de plano</Label>
        <select
          id="tipoPlano"
          className="mt-1 flex h-11 w-full rounded-md border border-border bg-background px-3 text-sm"
          {...register("tipoPlano")}
          defaultValue=""
        >
          <option value="" disabled>
            Selecione
          </option>
          <option value="individual">Individual</option>
          <option value="familiar">Familiar</option>
          <option value="empresarial">Empresarial (PME)</option>
          <option value="mei">MEI</option>
        </select>
        {errors.tipoPlano && (
          <p className="mt-1 text-xs text-red-600">{errors.tipoPlano.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="mensagem">Mensagem (opcional)</Label>
        <Textarea id="mensagem" className="mt-1" {...register("mensagem")} />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Solicitar cotação gratuita"}
      </Button>

      <p className="text-xs text-muted-foreground">
        Ao enviar, você concorda em ser contatado por e-mail por uma
        corretora parceira registrada na ANS. Não vendemos nem compartilhamos
        seus dados com terceiros fora desse contato.
      </p>
    </form>
  );
}
