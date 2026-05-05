import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardStats {
  totalCollections?: number;
  totalViews?: number;
  totalSales?: number;
  totalEarnings?: number;
  pendingPayments?: number;
  unreadMessages?: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        setIsLoading(true);
        const data = await api.getDashboardStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar estadísticas');
        console.error('[v0] Error loading stats:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  if (isLoading) {
    return <div className="text-center text-gray-600">Cargando dashboard...</div>;
  }

  if (error) {
    return <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Bienvenido a tu panel de control</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Colecciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats?.totalCollections || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Visualizaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats?.totalViews || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats?.totalSales || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ganancias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              ${typeof stats?.totalEarnings === 'number' ? stats.totalEarnings.toFixed(2) : '0.00'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        {stats?.pendingPayments ? (
          <div className="rounded-lg bg-blue-50 p-4 text-blue-700">
            Tienes {stats.pendingPayments} pago(s) pendiente(s) de aprobación
          </div>
        ) : null}
        {stats?.unreadMessages ? (
          <div className="rounded-lg bg-green-50 p-4 text-green-700">
            Tienes {stats.unreadMessages} mensaje(s) sin leer
          </div>
        ) : null}
      </div>
    </div>
  );
}
