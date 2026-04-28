import { Link } from 'react-router';
import { fileUrl } from '../../api/endpoints';
import type { Provider } from '../../types';

type Props = {
  provider: Provider;
};

export const ProviderCard = ({ provider }: Props) => {
  const cover = provider.works?.[0]?.photos?.[0]?.url;

  return (
    <Link
      to={`/providers/${provider.id}`}
      className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition"
    >
      <div className="aspect-video bg-slate-100 overflow-hidden">
        {cover ? (
          <img
            src={fileUrl(cover)}
            alt={provider.fullName}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            Sin fotos
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{provider.fullName}</h3>
        <p className="text-sm text-brand-600">{provider.trade}</p>
        <p className="text-sm text-slate-500 mt-1">{provider.city}</p>
      </div>
    </Link>
  );
};