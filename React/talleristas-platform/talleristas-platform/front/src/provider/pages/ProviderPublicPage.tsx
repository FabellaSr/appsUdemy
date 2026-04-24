import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { providers } from '../../auth/api/endpoints';
import type { Provider } from '../../types';
import { ProviderHeader } from '../components/ProviderHeader';
import { ProviderWorksGrid } from '../components/ProviderWorksGird';
import ProviderQr from '../components/ProviderQr';
 

export function ProviderPublicPage() {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);

  useEffect(() => {
    if (!id) return;

    setProvider(null);

    providers.get(id).then((r) => setProvider(r.data));
  }, [id]);

  if (!provider) {
    return <div className="text-slate-500">Cargando…</div>;
  }

  return (
    <div className="space-y-8">
      <ProviderHeader provider={provider} />

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <ProviderWorksGrid works={provider.works ?? []} />
        </div>

        <div>
          <ProviderQr
            providerId={id}
            fileName={`provider-${id}`}
          />
        </div>
      </div>
    </div>
  );
}