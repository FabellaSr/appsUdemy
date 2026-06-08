import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Collection {
  id: string;
  title: string;
  description?: string;
  talleristName?: string;
  status?: 'draft' | 'pending' | 'published' | 'rejected';
  createdAt?: string;
}

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [pendingCollections, setPendingCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      setIsLoading(true);
      const [all, pending] = await Promise.all([
        api.adminGetCollections(),
        api.adminGetPendingCollections(),
      ]);
      setCollections(all || []);
      setPendingCollections(pending || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar colecciones');
      console.error('[v0] Error loading collections:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (collectionId: string) => {
    try {
      setIsProcessing(true);
      await api.adminApproveCollection(collectionId);
      setRejectReason('');
      setSelectedCollection(null);
      await loadCollections();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al aprobar colección');
      console.error('[v0] Error approving collection:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (collectionId: string) => {
    if (!rejectReason.trim()) {
      setError('Debe proporcionar una razón para rechazar');
      return;
    }

    try {
      setIsProcessing(true);
      await api.adminRejectCollection(collectionId, rejectReason);
      setRejectReason('');
      setSelectedCollection(null);
      await loadCollections();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al rechazar colección');
      console.error('[v0] Error rejecting collection:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-600">Cargando colecciones...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Colecciones</h1>
        <p className="mt-2 text-gray-600">Revisa y aprueba colecciones de talleristas</p>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Collections List */}
        <div className="lg:col-span-1">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Pendientes ({pendingCollections.length})
          </h2>
          <div className="space-y-2">
            {pendingCollections.map((collection) => (
              <Card
                key={collection.id}
                className={`cursor-pointer transition-colors ${
                  selectedCollection?.id === collection.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCollection(collection)}
              >
                <CardContent className="pt-4">
                  <p className="text-sm font-semibold text-gray-900">{collection.title}</p>
                  <p className="text-xs text-gray-600">{collection.talleristName}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="mb-4 mt-8 text-lg font-semibold text-gray-900">
            Todas ({collections.length})
          </h2>
          <div className="space-y-2">
            {collections.map((collection) => (
              <Card key={collection.id} className="hover:bg-gray-50">
                <CardContent className="pt-4">
                  <p className="text-sm font-semibold text-gray-900">{collection.title}</p>
                  {collection.status && (
                    <Badge variant="outline" className="mt-2 text-xs">
                      {collection.status}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Collection Detail */}
        <div className="lg:col-span-2">
          {selectedCollection ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedCollection.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Tallerista</p>
                  <p className="font-semibold text-gray-900">{selectedCollection.talleristName}</p>
                </div>

                {selectedCollection.description && (
                  <div>
                    <p className="text-sm text-gray-600">Descripción</p>
                    <p className="text-gray-900">{selectedCollection.description}</p>
                  </div>
                )}

                {selectedCollection.createdAt && (
                  <div>
                    <p className="text-sm text-gray-600">Fecha de Creación</p>
                    <p className="text-gray-900">
                      {new Date(selectedCollection.createdAt).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                )}

                {selectedCollection.status === 'pending' && (
                  <>
                    <div>
                      <Label htmlFor="rejectReason">Razón para rechazar (si aplica)</Label>
                      <Textarea
                        id="rejectReason"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Explica por qué rechazas esta colección..."
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(selectedCollection.id)}
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Procesando...' : 'Aprobar'}
                      </Button>
                      <Button
                        onClick={() => handleReject(selectedCollection.id)}
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
                Selecciona una colección para revisar
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
