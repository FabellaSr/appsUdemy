import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
export const AdminDashboardPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-semibold">Panel de administración</h1>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card><CardHeader><CardTitle>Usuarios</CardTitle><CardDescription>Gestión de miembros</CardDescription></CardHeader><CardContent>—</CardContent></Card>
      <Card><CardHeader><CardTitle>Cierre mensual</CardTitle><CardDescription>Procesos AS400</CardDescription></CardHeader><CardContent>—</CardContent></Card>
      <Card><CardHeader><CardTitle>Auditoría</CardTitle><CardDescription>Logs y reportes</CardDescription></CardHeader><CardContent>—</CardContent></Card>
    </div>
  </div>
);
