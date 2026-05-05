import { Link } from "@tanstack/react-router";
import type { Tallerista } from "@/data/talleristas";
import { MapPin } from "lucide-react";

export function TalleristaCard({ t }: { t: Tallerista }) {
  return (
    <Link
      to="/t/$slug"
      params={{ slug: t.slug }}
      className="group block overflow-hidden rounded-sm bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-warm"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={t.destacada}
          alt={`Trabajo de ${t.nombre}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-fade opacity-90" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
          <span className="eyebrow text-accent">{t.oficio}</span>
          <h3 className="mt-1 font-display text-2xl leading-tight text-white">{t.nombre}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-white/80">
            <MapPin className="h-3 w-3" /> {t.ubicacion}
          </p>
        </div>
      </div>
    </Link>
  );
}
