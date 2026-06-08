import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/sumarme")({
  head: () => ({
    meta: [
      { title: "Sumarme — Manos de Oficio" },
      { name: "description", content: "Pedí tu lugar en la vidriera de Manos de Oficio." },
    ],
  }),
  component: Sumarme,
});

function Sumarme() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Solicitud recibida", {
        description: "Vamos a revisarla y te respondemos en 48hs.",
      });
    }, 700);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-12">
      <div className="md:col-span-5">
        <p className="eyebrow">Sumate</p>
        <h1 className="mt-3 font-display text-5xl text-balance">
          Pedí tu lugar en la vidriera.
        </h1>
        <p className="mt-5 text-pretty text-foreground/85">
          Contanos qué hacés. Si tu trabajo encaja, te enviamos los pasos para activar tu
          perfil y publicar tu primera colección.
        </p>
        <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
          <li>· Mensualidad: $ — (configurable por admin)</li>
          <li>· Por colección: $ — (configurable por admin)</li>
          <li>· Hasta 10 fotos por colección, con marca de agua del taller</li>
        </ul>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-3 rounded-sm border border-border bg-card p-7 shadow-soft md:col-span-7"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nombre" name="nombre" />
          <Field label="Oficio" name="oficio" placeholder="Herrería, cerámica, etc." />
        </div>
        <Field label="Email" name="email" type="email" />
        <Field label="Ubicación" name="ubicacion" placeholder="Ciudad, provincia" />
        <div>
          <label className="eyebrow">Contanos sobre tu trabajo</label>
          <textarea
            required
            name="bio"
            rows={5}
            className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className="mt-2 w-full rounded-sm bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {sending ? "Enviando…" : "Enviar solicitud"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label, name, type = "text", placeholder,
}: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="eyebrow">{label}</label>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
