import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MonthlyClosePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Cierre mensual</h1>
      <Card>
        <CardHeader><CardTitle>Mayo 2025</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">El cierre bloquea el alta de gastos para el mes seleccionado.</p>
          <div className="flex gap-2">
            <Button variant="outline">Abrir mes</Button>
            <Button variant="destructive">Cerrar mes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
