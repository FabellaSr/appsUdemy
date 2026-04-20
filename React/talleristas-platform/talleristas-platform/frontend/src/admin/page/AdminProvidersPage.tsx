import { useEffect, useState } from 'react';
import { providers } from '../../api/endpoints';
import type { Provider } from '../../types';
import { Button } from '../../components/ui/button'; 

export function AdminProvidersPage() {
  const [list, setList] = useState<Provider[]>([]);
  const [form, setForm] = useState({ email: '', password: '', fullName: '', trade: '', city: '', phone: '' });
  const [open, setOpen] = useState(false);

  const load = () => providers.list().then((r) => setList(r.data));
  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await providers.create(form);
    setForm({ email: '', password: '', fullName: '', trade: '', city: '', phone: '' });
    setOpen(false);
    load();
  };

  const toggleActive = async (p: Provider) => {
    await providers.update(p.id, { isActive: !p.isActive });
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Proveedores</h1>
        <Button onClick={() => setOpen(!open)} >
          {open ? 'Cancelar' : '+ Nuevo'}
        </Button>
      </div>

      {open && (
        <form onSubmit={create} className="bg-white p-4 rounded-xl border border-slate-200 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.keys(form).map((k) => (
            <input key={k} placeholder={k} type={k === 'password' ? 'password' : 'text'}
              value={(form as any)[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              required={['email', 'password', 'fullName'].includes(k)}
              className="border border-slate-300 rounded px-3 py-2" />
          ))}
          <button className="col-span-full bg-brand-600 text-white py-2 rounded">Crear proveedor</button>
        </form>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr><th className="p-3">Nombre</th><th>Oficio</th><th>Ciudad</th><th>Estado</th><th></th></tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.fullName}</td>
                <td>{p.trade}</td>
                <td>{p.city}</td>
                <td>{p.isActive ? '✅ Activo' : '⛔ Inactivo'}</td>
                <td><button onClick={() => toggleActive(p)} className="text-brand-600 hover:underline">
                  {p.isActive ? 'Desactivar' : 'Activar'}
                </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
