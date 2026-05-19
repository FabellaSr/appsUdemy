import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMonthlyReport } from '@/hooks/useReports';
//import { mockReport } from '@/services/mocks';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#a855f7'];

export default function DashboardPage() {
  //const r = mockReport;
  const now = new Date();

  const { data: r, loading } = useMonthlyReport(
    now.getFullYear(),
    now.getMonth() + 1
  );

console.log(r);
    if (loading || !r) {
    return <div>Cargando...</div>;  
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Total del mes</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">${r.totalAmount.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Miembros activos</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{r.byMember.length}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Movimientos</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{r.recent.length}</CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Por categoría</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={r.byCategory} dataKey="total" nameKey="categoryName" outerRadius={90} label>
                  {r.byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Ranking miembros</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <BarChart data={r.byMember}>
                <XAxis dataKey="userName" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
