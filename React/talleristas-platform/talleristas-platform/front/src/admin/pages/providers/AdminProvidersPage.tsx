import { useEffect, useState } from 'react';
import { providers } from '../../../auth/api/endpoints';
import type { Provider } from '../../../types';
import { Button } from '../../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const AdminProvidersPage = () => {
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
          <Button className="col-span-full bg-brand-600 text-white py-2 rounded">Crear proveedor</Button>
        </form>
      )}
      
      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Nombre</TableHead>
            <TableHead className="text-left">Oficio</TableHead>
            <TableHead className="text-left">Ciudad</TableHead>
            <TableHead className="text-left">Estado</TableHead>
            <TableHead className="text-left">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>       
            {list.map((p) => (
              <TableRow key={p.id} className="border-t">
                <TableCell>{p.fullName}</TableCell>
                <TableCell>{p.trade}</TableCell>
                <TableCell>{p.city}</TableCell>
                <TableCell>{p.isActive ? '✅ Activo' : '⛔ Inactivo'}</TableCell>
                <TableCell><Button onClick={() => toggleActive(p)} >
                  {p.isActive ? 'Desactivar' : 'Activar'}
                </Button></TableCell>
              </TableRow>
            ))}    
      </TableBody>
    </Table>
    </div >
  );
}
