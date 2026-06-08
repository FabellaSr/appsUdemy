import { useEffect, useState } from 'react';
import { providers } from '../../auth/api/endpoints';
import type { Provider } from '../../types';
import { HomeLayout } from '../layouts/HomeLayout';
import { ProvidersGrid } from '../components/ProvidersGrid';

export default function HomePage() {
  const [list, setList] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    providers
      .list()
      .then((r) => setList(r.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <HomeLayout />
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Nuestros proveedores</h2>
        <ProvidersGrid list={list} loading={loading} />
      </section>
    </div>
  );
}