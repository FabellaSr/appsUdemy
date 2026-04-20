import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { providers, fileUrl } from '../../api/endpoints';
import type { Provider } from '../../types';

export default function ProviderPublicPage() {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);

  useEffect(() => { if (id) providers.get(id).then((r) => setProvider(r.data)); }, [id]);

  if (!provider) return <div className="text-slate-500">Cargando…</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h1 className="text-3xl font-bold">{provider.fullName}</h1>
        <p className="text-brand-600 font-medium mt-1">{provider.trade}</p>
        <p className="text-slate-500 mt-1">{provider.city}</p>
        {provider.bio && <p className="text-slate-700 mt-4">{provider.bio}</p>}
        {provider.phone && (
          <div className="mt-4 inline-block bg-brand-50 text-brand-700 px-4 py-2 rounded-lg">
            📞 {provider.phone}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Trabajos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {provider.works?.map((w) => (
            <div key={w.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              {w.photos[0] && (
                <img src={fileUrl(w.photos[0].url)} alt={w.title} className="w-full aspect-video object-cover" />
              )}
              <div className="p-4">
                <h3 className="font-semibold">{w.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{w.description}</p>
                {w.photos.length > 1 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {w.photos.slice(1).map((ph) => (
                      <img key={ph.id} src={fileUrl(ph.url)} className="aspect-square object-cover rounded" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
