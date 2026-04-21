import { useEffect, useState } from 'react';
import { payments } from '../../auth/api/endpoints';
import type { Payment } from '../../types';

export function MyPaymentsPage() {
  const [list, setList] = useState<Payment[]>([]);
  useEffect(() => { payments.list().then((r) => setList(r.data)); }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <h1 className="text-xl font-bold p-4 border-b">Mis pagos</h1>
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left">
          <tr><th className="p-3">Fecha</th><th>Concepto</th><th>Monto</th><th>Estado</th></tr>
        </thead>
        <tbody>
          {list.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{new Date(p.createdAt).toLocaleDateString()}</td>
              <td>{p.concept}</td>
              <td>{p.currency} {Number(p.amount).toLocaleString()}</td>
              <td>
                <span className={`px-2 py-1 rounded text-xs ${
                  p.status === 'paid' ? 'bg-green-100 text-green-700' :
                  p.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'}`}>{p.status}</span>
              </td>
            </tr>
          ))}
          {list.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-slate-400">Sin pagos</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
