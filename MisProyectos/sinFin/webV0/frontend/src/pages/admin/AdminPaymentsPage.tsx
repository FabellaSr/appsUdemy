import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Payment {
  id: string;
  amount: number;
  type: 'collection' | 'maintenance';
  status: 'pending' | 'approved' | 'rejected';
  talleristName?: string;
  reference?: string;
  createdAt?: string;
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [pendingPayments, setPendingPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setIsLoading(true);
      const [all, pending] = await Promise.all([
        api.adminGetPayments(),
        api.adminGetPendingPayments(),
      ]);
      setPayments(all || []);
      setPendingPayments(pending || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar pagos');
      console.error('[v0] Error loading payments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (paymentId: string) => {
    try {
      setIsProcessing(true);
      await api.adminApprovePayment(paymentId);
      setRejectReason('');
      setSelectedPayment(null);
      await loadPayments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al aprobar pago');
      console.error('[v0] Error approving payment:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (paymentId: string) => {
    if (!rejectReason.trim()) {
      setError('Debe proporcionar una razón para rechazar');
      return;
    }

    try {
      setIsProcessing(true);
      await api.adminRejectPayment(paymentId, rejectReason);
      setRejectReason('');
      setSelectedPayment(null);
      await loadPayments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al rechazar pago');
      console.error('[v0] Error rejecting payment:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-600">Cargando pagos...</div>;
  }

  const getTypeLabel = (type: string) => {
    return type === 'collection' ? 'Colección' : 'Mantenimiento';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Pagos</h1>
        <p className="mt-2 text-gray-600">Revisa y aprueba pagos de talleristas</p>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Payments List */}
        <div className="lg:col-span-1">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Pendientes ({pendingPayments.length})
          </h2>
          <div className="space-y-2">
            {pendingPayments.map((payment) => (
              <Card
                key={payment.id}
                className={`cursor-pointer transition-colors ${
                  selectedPayment?.id === payment.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedPayment(payment)}
              >
                <CardContent className="pt-4">
                  <p className="text-sm font-semibold text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-600">{payment.talleristName}</p>
                  <Badge className="mt-2 text-xs">{getTypeLabel(payment.type)}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="mb-4 mt-8 text-lg font-semibold text-gray-900">
            Todos ({payments.length})
          </h2>
          <div className="space-y-2">
            {payments.map((payment) => (
              <Card key={payment.id} className="hover:bg-gray-50">
                <CardContent className="pt-4">
                  <p className="text-sm font-semibold text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {payment.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Detail */}
        <div className="lg:col-span-2">
          {selectedPayment ? (
            <Card>
              <CardHeader>
                <CardTitle>${selectedPayment.amount.toFixed(2)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Tallerista</p>
                  <p className="font-semibold text-gray-900">{selectedPayment.talleristName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Tipo</p>
                  <p className="font-semibold text-gray-900">{getTypeLabel(selectedPayment.type)}</p>
                </div>

                {selectedPayment.reference && (
                  <div>
                    <p className="text-sm text-gray-600">Referencia</p>
                    <p className="font-semibold text-gray-900">{selectedPayment.reference}</p>
                  </div>
                )}

                {selectedPayment.createdAt && (
                  <div>
                    <p className="text-sm text-gray-600">Fecha</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(selectedPayment.createdAt).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                )}

                {selectedPayment.status === 'pending' && (
                  <>
                    <div>
                      <Label htmlFor="rejectReason">Razón para rechazar (si aplica)</Label>
                      <Textarea
                        id="rejectReason"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Explica por qué rechazas este pago..."
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(selectedPayment.id)}
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Procesando...' : 'Aprobar'}
                      </Button>
                      <Button
                        onClick={() => handleReject(selectedPayment.id)}
                        disabled={isProcessing || !rejectReason.trim()}
                        variant="destructive"
                      >
                        {isProcessing ? 'Procesando...' : 'Rechazar'}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-gray-600">
                Selecciona un pago para revisar
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
