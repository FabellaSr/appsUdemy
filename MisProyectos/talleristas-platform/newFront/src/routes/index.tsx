import { createFileRoute, Link } from "@tanstack/react-router";
import heroWorkshop from "@/assets/hero-workshop.jpg";
import { talleristas } from "@/data/talleristas";
import { TalleristaCard } from "@/components/tallerista-card";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manos de Oficio — Talleristas" },
      {
        name: "description",
        content: "Conocé herreros, ceramistas, carpinteros y vidrieros. Su obra, en una sola vidriera.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroWorkshop}
            alt="Herrero forjando metal incandescente"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-24 pt-28 md:grid-cols-12 md:pb-32 md:pt-36">
          <div className="md:col-span-8">
            <p className="eyebrow">Vidriera de oficios · Argentina</p>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] text-balance md:text-7xl lg:text-8xl">
              El trabajo de la mano,
              <br />
              <span className="italic text-copper">a la vista de todos.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg text-foreground/85">
              Herreros, ceramistas, carpinteros, vidrieros. Una plataforma para que cada
              tallerista exhiba su obra en colecciones cuidadas y reciba contacto directo,
              sin intermediarios.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#talleristas"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-warm transition-transform hover:-translate-y-0.5"
              >
                Ver talleristas <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/sumarme"
                className="inline-flex items-center gap-2 rounded-sm border border-foreground/30 bg-background/40 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-background"
              >
                Soy tallerista
              </Link>
            </div>
          </div>
        </div>

        {/* "Etiqueta" decorativa */}
        <div className="mx-auto max-w-7xl px-6 pb-10">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border/60 pt-6 text-xs text-muted-foreground">
            <span className="eyebrow text-foreground/70">Hoy en la vidriera</span>
            <span>· {talleristas.length} talleristas</span>
            <span>· {talleristas.reduce((a, t) => a + t.colecciones.length, 0)} colecciones publicadas</span>
            <span>· Hecho a mano</span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section id="talleristas" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Catálogo</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Talleristas en activo</h2>
          </div>
          <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
            Cada perfil publica colecciones de hasta 10 fotografías. Hacé click para ver la
            obra y contactar al tallerista.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {talleristas.map((t) => (
            <TalleristaCard key={t.slug} t={t} />
          ))}
        </div>
      </section>

      {/* Banda manifiesto */}
      <section className="border-y border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Manifiesto</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Una vidriera honesta, sin algoritmo.
            </h2>
          </div>
          <div className="space-y-5 text-pretty text-base text-foreground/85 md:col-span-7">
            <p>
              Los talleristas pagan una mensualidad simple y un costo por colección
              publicada. No hay subasta de visibilidad ni promociones pagas. El orden lo
              decide el catálogo, no la billetera.
            </p>
            <p>
              Las fotos se publican con la marca de agua del taller para proteger la obra.
              El contacto va directo al artesano: nadie cobra comisión por encima.
            </p>
            <Link
              to="/sumarme"
              className="inline-flex items-center gap-2 text-sm font-semibold text-copper hover:underline underline-offset-4"
            >
              Cómo sumarme como tallerista <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
