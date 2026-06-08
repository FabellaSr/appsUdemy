import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Payment {
  id: string;
  amount: number;
  type: 'collection' | 'maintenance';
  status: 'pending' | 'approved' | 'rejected';
  reference?: string;
  createdAt?: string;
  collectionTitle?: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPayments() {
      try {
        setIsLoading(true);
        const data = await api.getPayments();
        setPayments(data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar pagos');
        console.error('[v0] Error loading payments:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPayments();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    return type === 'collection' ? 'Colección' : 'Mantenimiento';
  };

  if (isLoading) {
    return <div className="text-center text-gray-600">Cargando pagos...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mis Pagos</h1>
        <p className="mt-2 text-gray-600">Historial de pagos y transacciones</p>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      {payments.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-gray-600">
            No hay pagos registrados
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        ${payment.amount.toFixed(2)}
                      </h3>
                      <Badge className="text-xs">{getTypeLabel(payment.type)}</Badge>
                      <Badge className={`text-xs ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </Badge>
                    </div>
                    {payment.collectionTitle && (
                      <p className="mt-2 text-sm text-gray-600">{payment.collectionTitle}</p>
                    )}
                    {payment.reference && (
                      <p className="text-sm text-gray-500">Referencia: {payment.reference}</p>
                    )}
                    {payment.createdAt && (
                      <p className="text-sm text-gray-500">
                        {new Date(payment.createdAt).toLocaleDateString('es-ES')}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
