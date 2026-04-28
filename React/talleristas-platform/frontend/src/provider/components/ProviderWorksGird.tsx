import type { Work } from '../../types';
import { ProviderWorkCard } from './ProviderWorkCard';

type ProviderWorksGridProps = {
  works: Work[];
};

export function ProviderWorksGrid({ works }: ProviderWorksGridProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Trabajos</h2>

      {works.length === 0 ? (
        <div className="text-slate-500">Este proveedor todavía no tiene trabajos publicados.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <ProviderWorkCard key={work.id} work={work} />
          ))}
        </div>
      )}
    </div>
  );
}