import { useEffect, useState } from 'react';
import { payments, providers } from '../../auth/api/endpoints';
import type { Payment, Provider } from '../../types';

export function AdminPaymentsPage() {
  const [list, setList] = useState<Payment[]>([]);
  const [provs, setProvs] = useState<Provider[]>([]);
  const [form, setForm] = useState({ providerId: '', amount: 0, concept: '', status: 'pending' as const });

  const load = () => payments.list().then((r) => setList(r.data));
  useEffect(() => { load(); providers.list().then((r) => setProvs(r.data)); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await payments.create(form);
    setForm({ providerId: '', amount: 0, concept: '', status: 'pending' });
    load();
  };

  const setStatus = async (id: string, status: 'paid' | 'pending' | 'cancelled') => {
    await payments.update(id, { status }); load();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="bg-white p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3">
        <select value={form.providerId} onChange={(e) => setForm({ ...form, providerId: e.target.value })}
          required className="border border-slate-300 rounded px-3 py-2">
          <option value="">Proveedor…</option>
          {provs.map((p) => <option key={p.id} value={p.id}>{p.fullName}</option>)}
        </select>
        <input type="number" placeholder="Monto" value={form.amount}
          onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
          required className="border border-slate-300 rounded px-3 py-2" />
        <input placeholder="Concepto" value={form.concept}
          onChange={(e) => setForm({ ...form, concept: e.target.value })}
          className="border border-slate-300 rounded px-3 py-2" />
        <button className="bg-brand-600 text-white py-2 rounded">Registrar</button>
      </form>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr><th className="p-3">Proveedor</th><th>Concepto</th><th>Monto</th><th>Estado</th><th></th></tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.provider?.fullName}</td>
                <td>{p.concept}</td>
                <td>{p.currency} {Number(p.amount).toLocaleString()}</td>
                <td>{p.status}</td>
                <td className="space-x-2">
                  {p.status !== 'paid' && <button onClick={() => setStatus(p.id, 'paid')} className="text-green-600 hover:underline">Marcar pagado</button>}
                  {p.status !== 'cancelled' && <button onClick={() => setStatus(p.id, 'cancelled')} className="text-red-600 hover:underline">Cancelar</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
