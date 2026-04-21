import type { Provider } from '../../types';
import { ProviderCard } from './ProviderCard';

type Props = {
  list: Provider[];
  loading: boolean;
};

export const ProvidersGrid = ({ list, loading }: Props) => {
  if (loading) {
    return <div className="text-slate-500">Cargando…</div>;
  }

  if (!list.length) {
    return <div className="text-slate-500">No hay proveedores para mostrar.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((p) => (
        <ProviderCard key={p.id} provider={p} />
      ))}
    </div>
  );
};