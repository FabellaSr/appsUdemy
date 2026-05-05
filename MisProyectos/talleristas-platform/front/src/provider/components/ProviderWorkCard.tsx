import { fileUrl } from '../../auth/api/endpoints';
import type { Work } from '../../types';

type ProviderWorkCardProps = {
  work: Work;
};

export function ProviderWorkCard({ work }: ProviderWorkCardProps) {
  const coverPhoto = work.photos?.[0];
  const extraPhotos = work.photos?.slice(1) ?? [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {coverPhoto && (
        <img
          src={fileUrl(coverPhoto.url)}
          alt={work.title}
          className="w-full aspect-video object-cover"
        />
      )}

      <div className="p-4">
        <h3 className="font-semibold">{work.title}</h3>

        <p className="text-sm text-slate-500 mt-1">{work.description}</p>

        {extraPhotos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            {extraPhotos.map((photo) => (
              <img
                key={photo.id}
                src={fileUrl(photo.url)}
                alt={work.title}
                className="aspect-square object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}