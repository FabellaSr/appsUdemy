import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl leading-none tracking-tight">Manos de Oficio</span>
          <span className="hidden text-[11px] uppercase tracking-[0.3em] text-copper sm:inline">
            · taller
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/"
            className="rounded-sm px-3 py-2 text-foreground/75 transition-colors hover:text-foreground"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-foreground font-semibold" }}
          >
            Talleristas
          </Link>
          <Link
            to="/sobre"
            className="rounded-sm px-3 py-2 text-foreground/75 transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground font-semibold" }}
          >
            Sobre
          </Link>
          <Link
            to="/sumarme"
            className="ml-2 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Sumarme
          </Link>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
