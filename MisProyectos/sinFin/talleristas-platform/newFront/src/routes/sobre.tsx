import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre el proyecto — Manos de Oficio" },
      { name: "description", content: "Cómo funciona Manos de Oficio: pagos, colecciones y comunidad." },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="eyebrow">Sobre el proyecto</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl text-balance">
        Una vidriera para los que hacen.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground/85 text-pretty">
        Manos de Oficio nació con una idea simple: que los talleristas tengan un lugar
        digno donde mostrar su trabajo, sin pelear contra algoritmos ni pagar comisiones
        absurdas por cada cliente que los encuentra.
      </p>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {[
          { n: "01", t: "Mensualidad simple", d: "Un único valor mensual cubre el mantenimiento del perfil y el espacio en la vidriera." },
          { n: "02", t: "Pago por colección", d: "Cada colección publicada se paga una sola vez. Hasta 10 fotos por colección." },
          { n: "03", t: "Sin intermediarios", d: "Los clientes contactan al tallerista de forma directa. La plataforma no cobra comisión por venta." },
        ].map((b) => (
          <div key={b.n} className="rounded-sm border border-border bg-card p-6 shadow-soft">
            <span className="font-display text-3xl text-copper">{b.n}</span>
            <h3 className="mt-3 font-display text-2xl">{b.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-border pt-10">
        <Link
          to="/sumarme"
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Quiero sumarme como tallerista
        </Link>
      </div>
    </div>
  );
}
