import { useEffect, useState } from 'react';
import { notifications, providers } from '../../api/endpoints';
import type { Notification, Provider } from '../../types';

export function AdminNotificationsPage() {
  const [list, setList] = useState<Notification[]>([]);
  const [provs, setProvs] = useState<Provider[]>([]);
  const [form, setForm] = useState({ providerId: '', title: '', message: '' });

  const load = () => notifications.list().then((r) => setList(r.data));
  useEffect(() => { load(); providers.list().then((r) => setProvs(r.data)); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await notifications.create(form);
    setForm({ providerId: '', title: '', message: '' });
    load();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
        <h2 className="font-bold">Enviar aviso</h2>
        <select value={form.providerId} onChange={(e) => setForm({ ...form, providerId: e.target.value })}
          required className="w-full border border-slate-300 rounded px-3 py-2">
          <option value="">Proveedor…</option>
          {provs.map((p) => <option key={p.id} value={p.id}>{p.fullName}</option>)}
        </select>
        <input placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          required className="w-full border border-slate-300 rounded px-3 py-2" />
        <textarea placeholder="Mensaje" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          required className="w-full border border-slate-300 rounded px-3 py-2 h-24" />
        <button className="bg-brand-600 text-white px-4 py-2 rounded">Enviar</button>
      </form>

      <div className="space-y-2">
        <h2 className="font-bold">Historial</h2>
        {list.map((n) => (
          <div key={n.id} className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">{n.title}</span>
              <span className="text-slate-400">{n.provider?.fullName} · {new Date(n.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-sm text-slate-600 mt-1">{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
