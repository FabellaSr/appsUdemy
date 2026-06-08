import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FileCode2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/Loading';
import { EmptyState } from '@/components/EmptyState';
import { installationsService } from '@/services/installations.service';
import { useAuth } from '@/hooks/useAuth';
import type { InstallationDetailItem } from '@/interfaces';

const normalize = (raw: any): InstallationDetailItem[] => {
  const arr = raw?.detalleIns?.detalle;
  if (!arr) return [];
  return (Array.isArray(arr) ? arr : [arr]).map((x: any) => ({
    objeto: String(x.objeto ?? ''),
    libAuxiliar: String(x.libAuxiliar ?? ''),
    qsrcpf: String(x.qsrcpf ?? ''),
    tipo: String(x.tipo ?? ''),
    destinoObjeto: String(x.destinoObjeto ?? ''),
    atributo: String(x.atributo ?? ''),
    libFuente: String(x.libFuente ?? ''),
    srcFuenteo: String(x.srcFuenteo ?? ''),
    estadoFuente: String(x.estadoFuente ?? '0'),
    estadoObjeto: String(x.estadoObjeto ?? '0'),
    fecInstFuente: x.fecInstFuente ? String(x.fecInstFuente) : undefined,
    usuarioQueInstaloFuente: x.usuarioQueInstaloFuente ? String(x.usuarioQueInstaloFuente) : undefined,
    fecInstObjeto: x.fecInstObjeto ? String(x.fecInstObjeto) : undefined,
    usuarioQueInstaloObjeto: x.usuarioQueInstaloObjeto ? String(x.usuarioQueInstaloObjeto) : undefined,
  }));
};

export const InstallationDetailPage = () => {
  const { type = '', number = '', seq = '' } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [items, setItems] = useState<InstallationDetailItem[] | null>(null);
  const [busy, setBusy] = useState<'objects' | 'sources' | null>(null);

  const reload = () =>
    installationsService.detail(type, number, seq).then(d => setItems(normalize(d))).catch(() => setItems([]));

  useEffect(() => { reload(); /* eslint-disable-next-line */ }, [type, number, seq]);

  const installObjects = async () => {
    if (!user) return;
    setBusy('objects');
    try { await installationsService.installObjects(type, number, seq, user.username); await reload(); }
    finally { setBusy(null); }
  };
  const installSources = async () => {
    if (!user) return;
    setBusy('sources');
    try { await installationsService.installSources(type, number, seq, user.username); await reload(); }
    finally { setBusy(null); }
  };

  if (!items) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
          <div>
            <h1 className="text-2xl font-semibold">Instalación {type} / {number} / {seq}</h1>
            <p className="text-sm text-muted-foreground">{items.length} elementos</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled={busy !== null} onClick={installObjects}>
            <Package className="h-4 w-4" /> {busy === 'objects' ? 'Instalando…' : 'Instalar objetos'}
          </Button>
          <Button disabled={busy !== null} onClick={installSources}>
            <FileCode2 className="h-4 w-4" /> {busy === 'sources' ? 'Instalando…' : 'Instalar fuentes'}
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState title="Sin objetos ni fuentes" />
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-3 py-2">Objeto</th>
                <th className="px-3 py-2">Tipo</th>
                <th className="px-3 py-2">Atributo</th>
                <th className="px-3 py-2">Lib. obj.</th>
                <th className="px-3 py-2">Lib. fuente</th>
                <th className="px-3 py-2">Estado obj.</th>
                <th className="px-3 py-2">Estado fuente</th>
                <th className="px-3 py-2">Fec. inst. obj.</th>
                <th className="px-3 py-2">Fec. inst. fuente</th>
              </tr>
            </thead>
            <tbody>
              {items.map((d, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-3 py-2 font-mono">{d.objeto}</td>
                  <td className="px-3 py-2">{d.tipo}</td>
                  <td className="px-3 py-2">{d.atributo}</td>
                  <td className="px-3 py-2">{d.destinoObjeto}</td>
                  <td className="px-3 py-2">{d.libFuente}</td>
                  <td className="px-3 py-2">{d.estadoObjeto === '1' ? '✓ Instalado' : '— Pendiente'}</td>
                  <td className="px-3 py-2">{d.estadoFuente === '1' ? '✓ Instalado' : '— Pendiente'}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {d.estadoObjeto === '1' ? `${d.fecInstObjeto ?? ''} ${d.usuarioQueInstaloObjeto ?? ''}` : '—'}
                  </td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {d.estadoFuente === '1' ? `${d.fecInstFuente ?? ''} ${d.usuarioQueInstaloFuente ?? ''}` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
};
