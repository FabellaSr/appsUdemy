import { useEffect, useState } from 'react';
import { notifications } from '../../api/endpoints';
import type { Notification } from '../../types';

export function MyNotificationsPage() {
  const [list, setList] = useState<Notification[]>([]);
  const load = () => notifications.list().then((r) => setList(r.data));
  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => { await notifications.markRead(id); load(); };

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold mb-4">Mis avisos</h1>
      {list.map((n) => (
        <div key={n.id} className={`bg-white p-4 rounded-xl border ${n.isRead ? 'border-slate-200' : 'border-brand-300 bg-brand-50'}`}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{n.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{n.message}</p>
              <p className="text-xs text-slate-400 mt-2">{new Date(n.createdAt).toLocaleString()}</p>
            </div>
            {!n.isRead && <button onClick={() => markRead(n.id)} className="text-brand-600 text-sm hover:underline">Marcar leído</button>}
          </div>
        </div>
      ))}
      {list.length === 0 && <p className="text-slate-400 text-center py-8">Sin avisos</p>}
    </div>
  );
}
