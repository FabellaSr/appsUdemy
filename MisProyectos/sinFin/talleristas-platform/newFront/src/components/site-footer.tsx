import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Manos de Oficio</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Plataforma de talleristas. Una vidriera honesta para quienes hacen las cosas a mano.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">Navegar</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-copper">Talleristas</Link></li>
            <li><Link to="/sobre" className="hover:text-copper">Sobre el proyecto</Link></li>
            <li><Link to="/sumarme" className="hover:text-copper">Sumarme</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Contacto</p>
          <p className="text-sm text-muted-foreground">hola@manosdeoficio.test</p>
          <p className="mt-1 text-sm text-muted-foreground">Buenos Aires · Argentina</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Manos de Oficio · Hecho con paciencia
      </div>
    </footer>
  );
}
