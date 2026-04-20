import { useEffect, useState } from 'react';
import { works as worksApi, uploads, fileUrl, providers as providersApi } from '../../api/endpoints';
import { useAuth } from '../../auth/context/AuthContext';
import type { Work } from '../../types';

export function MyWorksPage() {
  const { user } = useAuth();
  const [list, setList] = useState<Work[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    if (!user?.providerId) return;
    const r = await providersApi.get(user.providerId);
    setList(r.data.works ?? []);
  };
  useEffect(() => { load(); }, [user]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      const photoUrls: string[] = [];
      if (files) {
        for (const f of Array.from(files)) {
          const r = await uploads.photo(f);
          photoUrls.push(r.data.url);
        }
      }
      await worksApi.create({ title, description, photoUrls });
      setTitle(''); setDescription(''); setFiles(null);
      (document.getElementById('file-input') as HTMLInputElement).value = '';
      await load();
    } finally { setUploading(false); }
  };

  const del = async (id: string) => {
    if (!confirm('¿Eliminar trabajo?')) return;
    await worksApi.remove(id);
    await load();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-3">
        <h2 className="text-xl font-bold">Nuevo trabajo</h2>
        <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)}
          required className="w-full border border-slate-300 rounded px-3 py-2" />
        <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-slate-300 rounded px-3 py-2 h-24" />
        <input id="file-input" type="file" multiple accept="image/*"
          onChange={(e) => setFiles(e.target.files)}
          className="block text-sm" />
        <button disabled={uploading} className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded disabled:opacity-50">
          {uploading ? 'Subiendo…' : 'Crear'}
        </button>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-4">Mis trabajos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {list.map((w) => (
            <div key={w.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{w.title}</h3>
                  <p className="text-sm text-slate-500">{w.description}</p>
                </div>
                <button onClick={() => del(w.id)} className="text-red-600 text-sm hover:underline">Eliminar</button>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {w.photos.map((ph) => (
                  <img key={ph.id} src={fileUrl(ph.url)} className="aspect-square object-cover rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
