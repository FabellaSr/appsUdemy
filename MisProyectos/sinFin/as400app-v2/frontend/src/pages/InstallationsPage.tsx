import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/Loading';
import { EmptyState } from '@/components/EmptyState';
import { installationsService } from '@/services/installations.service';
import type { Installation } from '@/interfaces';

const normalizeList = (raw: any): Installation[] => {
  const arr = raw?.instalaciones?.instalacion;
  if (!arr) return [];
  return (Array.isArray(arr) ? arr : [arr]).map((x: any) => ({
    type: String(x.type ?? ''),
    number: String(x.number ?? ''),
    sequence: String(x.sequence ?? ''),
    description: String(x.description ?? ''),
    user: String(x.user ?? ''),
    status: String(x.status ?? ''),
    date: String(x.date ?? ''),
  }));
};

export const InstallationsPage = () => {
  const [items, setItems] = useState<Installation[] | null>(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    installationsService.list().then(d => setItems(normalizeList(d))).catch(() => setItems([]));
  }, []);

  const filtered = useMemo(() => {
    if (!items) return [];
    const q = filter.toLowerCase();
    return items.filter(i =>
      i.number.toLowerCase().includes(q) ||
      i.user.toLowerCase().includes(q) ||
      i.date.includes(q),
    );
  }, [items, filter]);

  if (!items) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Instalaciones</h1>
          <p className="text-sm text-muted-foreground">Listado de instalaciones AS400</p>
        </div>
        <Link to="/installations/new"><Button><Plus className="h-4 w-4" /> Nueva instalación</Button></Link>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Filtrar por número, usuario o fecha…" value={filter}
          onChange={e => setFilter(e.target.value)} className="pl-9" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No hay instalaciones" description="Probá iniciando una nueva." />
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Tipo</th>
                <th className="px-4 py-3 font-medium">Número</th>
                <th className="px-4 py-3 font-medium">Sec.</th>
                <th className="px-4 py-3 font-medium">Descripción</th>
                <th className="px-4 py-3 font-medium">Usuario</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(i => (
                <tr key={`${i.type}-${i.number}-${i.sequence}`} className="border-t hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <Link className="text-primary hover:underline"
                      to={`/installations/${i.type}/${i.number}/${i.sequence}`}>
                      {i.type}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{i.number}</td>
                  <td className="px-4 py-3">{i.sequence}</td>
                  <td className="px-4 py-3">{i.description}</td>
                  <td className="px-4 py-3">{i.user}</td>
                  <td className="px-4 py-3">{i.date}</td>
                  <td className="px-4 py-3">{i.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
};
