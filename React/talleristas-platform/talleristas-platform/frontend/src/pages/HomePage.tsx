import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { providers } from '../api/endpoints';
import { fileUrl } from '../api/endpoints';
import type { Provider } from '../types';

export default function HomePage() {
  const [list, setList] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { providers.list().then((r) => setList(r.data)).finally(() => setLoading(false)); }, []);

  return (
    <div>
      <section className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
          Talleristas que hacen las cosas bien.
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Explorá los trabajos de nuestros proveedores y contactá directo con quien necesites.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Nuestros proveedores</h2>
        {loading && <div className="text-slate-500">Cargando…</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p) => {
            const cover = p.works?.[0]?.photos?.[0]?.url;
            return (
              <Link key={p.id} to={`/providers/${p.id}`} className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="aspect-video bg-slate-100 overflow-hidden">
                  {cover ? (
                    <img src={fileUrl(cover)} alt={p.fullName} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">Sin fotos</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{p.fullName}</h3>
                  <p className="text-sm text-brand-600">{p.trade}</p>
                  <p className="text-sm text-slate-500 mt-1">{p.city}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
