import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loading } from '@/components/Loading';
import { sectionsService } from '@/services/sections.service';
import type { Section } from '@/interfaces';

export const DashboardPage = () => {
  const [sections, setSections] = useState<Section[] | null>(null);
  useEffect(() => { sectionsService.list().then(setSections).catch(() => setSections([])); }, []);
  if (!sections) return <Loading />;
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Secciones disponibles</h1>
      <p className="mt-1 text-sm text-muted-foreground">Elegí qué tipo de tarea querés gestionar.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(s => {
          const Icon = (Icons as any)[s.icon] ?? Icons.Square;
          const card = (
            <Card className={`transition ${s.enabled ? 'hover:shadow-md hover:-translate-y-0.5' : 'opacity-50'}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{s.title}</CardTitle>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>{s.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                {s.enabled ? 'Disponible' : 'Próximamente'}
              </CardContent>
            </Card>
          );
          return s.enabled
            ? <Link key={s.id} to={`/${s.id}`}>{card}</Link>
            : <div key={s.id}>{card}</div>;
        })}
      </div>
    </div>
  );
};
