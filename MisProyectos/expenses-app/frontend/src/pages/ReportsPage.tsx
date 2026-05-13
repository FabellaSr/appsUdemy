import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockReport } from '@/services/mocks';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Reportes</h1>
        <div className="flex gap-2">
          <Button variant="outline">Exportar PDF</Button>
          <Button variant="outline">Exportar Excel</Button>
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle>Resumen mensual</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr><th>Categoría</th><th className="text-right">Total</th><th className="text-right">%</th></tr>
            </thead>
            <tbody>
              {mockReport.byCategory.map((c) => (
                <tr key={c.categoryId} className="border-t">
                  <td className="py-2">{c.categoryName}</td>
                  <td className="text-right">${c.total.toLocaleString()}</td>
                  <td className="text-right">{c.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
