import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getTallerista, type Tallerista } from "@/data/talleristas";
import { ArrowLeft, MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/t/$slug")({
  loader: ({ params }): { t: Tallerista } => {
    const t = getTallerista(params.slug);
    if (!t) throw notFound();
    return { t };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.t.nombre} — ${loaderData.t.oficio}` },
          { name: "description", content: loaderData.t.bio },
          { property: "og:title", content: `${loaderData.t.nombre} en Manos de Oficio` },
          { property: "og:description", content: loaderData.t.bio },
          { property: "og:image", content: loaderData.t.destacada },
        ]
      : [],
  }),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="eyebrow">Error</p>
      <h1 className="mt-2 font-display text-4xl">No pudimos cargar este perfil</h1>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 font-display text-4xl">Tallerista no encontrado</h1>
      <Link to="/" className="mt-6 inline-block text-sm font-semibold text-copper underline-offset-4 hover:underline">
        Volver a la vidriera
      </Link>
    </div>
  ),
  component: TalleristaPage,
});

function TalleristaPage() {
  const { t } = Route.useLoaderData();

  return (
    <article>
      {/* Cover */}
      <header className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={t.destacada} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-24">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Volver
          </Link>
          <p className="eyebrow mt-8">{t.oficio}</p>
          <h1 className="mt-3 font-display text-5xl text-balance md:text-7xl">{t.nombre}</h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-foreground/85">
            <MapPin className="h-4 w-4 text-copper" /> {t.ubicacion}
          </p>
        </div>
      </header>

      {/* Bio + contacto */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow">Sobre el taller</p>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/90">{t.bio}</p>
        </div>
        <aside className="md:col-span-5">
          <div className="rounded-sm border border-border bg-card p-6 shadow-soft">
            <p className="eyebrow">Contacto directo</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-copper" />
                <a href={`mailto:${t.contacto.email}`} className="hover:text-copper">
                  {t.contacto.email}
                </a>
              </li>
              {t.contacto.telefono && (
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-copper" /> {t.contacto.telefono}
                </li>
              )}
            </ul>
            <ContactForm tallerista={t.nombre} />
          </div>
        </aside>
      </section>

      {/* Colecciones */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-4xl">Colecciones</h2>
          <span className="text-sm text-muted-foreground">{t.colecciones.length} publicadas</span>
        </div>

        <div className="space-y-20">
          {t.colecciones.map((col: Tallerista["colecciones"][number]) => (
            <div key={col.id}>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl">{col.titulo}</h3>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">{col.descripcion}</p>
                </div>
                <span className="eyebrow">{col.fecha}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {col.fotos.map((src: string, i: number) => (
                  <div
                    key={i}
                    className={`overflow-hidden rounded-sm bg-secondary ${
                      i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${col.titulo} — foto ${i + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

function ContactForm({ tallerista }: { tallerista: string }) {
  const [sending, setSending] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success(`Mensaje enviado a ${tallerista}`, {
        description: "Te va a responder al email que dejaste.",
      });
    }, 700);
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3 border-t border-border pt-5">
      <p className="eyebrow">Escribirle</p>
      <input
        required
        name="nombre"
        placeholder="Tu nombre"
        className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
      <input
        required
        type="email"
        name="email"
        placeholder="Tu email"
        className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
      <textarea
        required
        name="mensaje"
        rows={4}
        placeholder="Contale qué necesitás…"
        className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {sending ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
