import type { Provider } from '../../types';

type ProviderHeaderProps = {
  provider: Provider;
};

export function ProviderHeader({ provider }: ProviderHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h1 className="text-3xl font-bold">{provider.fullName}</h1>

      <p className="text-brand-600 font-medium mt-1">{provider.trade}</p>

      <p className="text-slate-500 mt-1">{provider.city}</p>

      {provider.bio && (
        <p className="text-slate-700 mt-4">{provider.bio}</p>
      )}

      {provider.phone && (
        <div className="mt-4 inline-block bg-brand-50 text-brand-700 px-4 py-2 rounded-lg">
          📞 {provider.phone}
        </div>
      )}
    </div>
  );
}