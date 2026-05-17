import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { installationsService } from '@/services/installations.service';
import { useAuth } from '@/hooks/useAuth';

export const NewInstallationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('DESA');
  const [numero, setNumero] = useState('');
  const [detalle, setDetalle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      await installationsService.start({ tipo, numero, detalle, usuario: user?.username ?? '' });
      navigate(`/installations/${tipo}/${numero}/1`);
    } catch (err: any) {
      setError(err?.response?.data?.error ?? 'Error iniciando instalación');
    } finally { setLoading(false); }
  };

  return (
    <Card className="max-w-xl">
      <CardHeader><CardTitle>Nueva instalación (WSPIW1)</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Tipo</Label><Input value={tipo} onChange={e=>setTipo(e.target.value.toUpperCase())} required /></div>
            <div className="space-y-2"><Label>Número</Label><Input value={numero} onChange={e=>setNumero(e.target.value)} required /></div>
          </div>
          <div className="space-y-2"><Label>Detalle</Label><Input value={detalle} onChange={e=>setDetalle(e.target.value)} required /></div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading}>{loading ? 'Iniciando…' : 'Iniciar instalación'}</Button>
        </form>
      </CardContent>
    </Card>
  );
};
