import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PricingItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  type?: string;
}

export default function AdminPricingPage() {
  const [pricing, setPricing] = useState<PricingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<PricingItem>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadPricing();
  }, []);

  const loadPricing = async () => {
    try {
      setIsLoading(true);
      const data = await api.adminGetPricing();
      setPricing(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar precios');
      console.error('[v0] Error loading pricing:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: PricingItem) => {
    setEditingId(item.id);
    setEditData({ ...item });
  };

  const handleSave = async () => {
    if (!editingId) return;

    try {
      setIsSaving(true);
      await api.adminUpdatePricing(editingId, editData);
      setEditingId(null);
      setEditData({});
      await loadPricing();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar precio');
      console.error('[v0] Error updating pricing:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  if (isLoading) {
    return <div className="text-center text-gray-600">Cargando precios...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Precios</h1>
        <p className="mt-2 text-gray-600">Configura los precios y planes de servicio</p>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      {pricing.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-gray-600">
            No hay planes de precios configurados
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {pricing.map((item) => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                {editingId === item.id ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        value={editData.name || ''}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Descripción</Label>
                      <Input
                        id="description"
                        value={editData.description || ''}
                        onChange={(e) =>
                          setEditData({ ...editData, description: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="price">Precio</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={editData.price || ''}
                        onChange={(e) =>
                          setEditData({ ...editData, price: parseFloat(e.target.value) })
                        }
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        disabled={isSaving}
                      >
                        {isSaving ? 'Guardando...' : 'Guardar'}
                      </Button>
                      <Button onClick={handleCancel} variant="outline">
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600">{item.description}</p>
                      )}
                      <p className="mt-2 text-2xl font-bold text-blue-600">
                        ${item.price.toFixed(2)}
                      </p>
                      {item.type && (
                        <p className="text-sm text-gray-500">Tipo: {item.type}</p>
                      )}
                    </div>

                    <Button
                      onClick={() => handleEdit(item)}
                      variant="outline"
                    >
                      Editar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
