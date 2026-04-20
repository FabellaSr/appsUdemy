import { useEffect, useState } from 'react';
import { providers } from '../../api/endpoints';
import { useAuth } from '../../context/AuthContext';

export default function MyProfilePage() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (user?.providerId) providers.get(user.providerId).then((r) => setData(r.data));
  }, [user]);

  if (!data) return <div>Cargando…</div>;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    await providers.update(data.id, {
      fullName: data.fullName, trade: data.trade, bio: data.bio,
      phone: data.phone, city: data.city,
    });
    setMsg('Guardado');
    setTimeout(() => setMsg(''), 2000);
  };

  return (
    <form onSubmit={save} className="max-w-xl bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
      <h1 className="text-2xl font-bold">Mi perfil</h1>
      {['fullName', 'trade', 'phone', 'city'].map((k) => (
        <div key={k}>
          <label className="block text-sm font-medium mb-1 capitalize">{k}</label>
          <input value={data[k] ?? ''} onChange={(e) => setData({ ...data, [k]: e.target.value })}
            className="w-full border border-slate-300 rounded px-3 py-2" />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea value={data.bio ?? ''} onChange={(e) => setData({ ...data, bio: e.target.value })}
          className="w-full border border-slate-300 rounded px-3 py-2 h-32" />
      </div>
      {msg && <div className="text-green-600">{msg}</div>}
      <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded">Guardar</button>
    </form>
  );
}
