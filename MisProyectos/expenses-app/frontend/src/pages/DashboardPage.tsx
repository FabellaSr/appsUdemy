import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useReportsByDate } from '@/pages/reports/hooks/useReportsByDate';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#a855f7'];

export default function DashboardPage() {

  const now = new Date();

  const { data: report, loading } = useReportsByDate(
    now.getFullYear(),
    now.getMonth() + 1
  );
  if (loading || !report) {
    return <div>Cargando...</div>;
  }
  const balances = report.byMember.map((member) => ({
    userName: member.userName,
    balance:
      member.total -
      report.totalAmount / report.byMember.length,
  }));

  const creditors = balances
    .filter((b) => b.balance > 0)
    .sort((a, b) => b.balance - a.balance);

  const debtors = balances
    .filter((b) => b.balance < 0)
    .sort((a, b) => a.balance - b.balance);

  const debts: string[] = [];

  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const amount = Math.min(
      Math.abs(debtor.balance),
      creditor.balance
    );

    debts.push(
      `${debtor.userName} le debe $${Math.round(amount).toLocaleString()} a ${creditor.userName}`
    );

    debtor.balance += amount;
    creditor.balance -= amount;

    if (Math.abs(debtor.balance) < 1) i++;
    if (Math.abs(creditor.balance) < 1) j++;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader><CardTitle>Total del mes</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">${report.totalAmount.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Miembros activos</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{report.byMember.length}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Movimientos</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{report.recent.length}</CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Por categoría</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={report.byCategory} dataKey="total" nameKey="categoryName" outerRadius={90} label>
                  {report.byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
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
              <BarChart data={report.byMember}>
                <XAxis dataKey="userName" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Balances</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            {debts.length > 0 ? (
              debts.map((debt, index) => (
                <div key={index} className="text-sm font-medium">
                  {debt}
                </div>
              ))
            ) : (
              <div className="text-sm">Todos están equilibrados</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
