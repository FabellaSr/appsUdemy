import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Collection {
  id: string;
  title: string;
  description?: string;
  status?: 'draft' | 'pending' | 'published' | 'hidden';
  createdAt?: string;
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newCollection, setNewCollection] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      setIsLoading(true);
      const data = await api.getCollections();
      setCollections(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar colecciones');
      console.error('[v0] Error loading collections:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      await api.createCollection({
        title: newCollection.title,
        description: newCollection.description || undefined,
      });
      setNewCollection({ title: '', description: '' });
      await loadCollections();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear colección');
      console.error('[v0] Error creating collection:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteCollection = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta colección?')) return;

    try {
      await api.deleteCollection(id);
      await loadCollections();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar colección');
      console.error('[v0] Error deleting collection:', err);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'hidden':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (isLoading && collections.length === 0) {
    return <div className="text-center text-gray-600">Cargando colecciones...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mis Colecciones</h1>
        <p className="mt-2 text-gray-600">Crea y gestiona tus colecciones de fotografías</p>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      {/* Create New Collection */}
      <Card>
        <CardHeader>
          <CardTitle>Nueva Colección</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateCollection} className="space-y-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={newCollection.title}
                onChange={(e) => setNewCollection({ ...newCollection, title: e.target.value })}
                placeholder="Nombre de la colección"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={newCollection.description}
                onChange={(e) =>
                  setNewCollection({ ...newCollection, description: e.target.value })
                }
                placeholder="Describe tu colección..."
                rows={3}
              />
            </div>

            <Button type="submit" disabled={isCreating}>
              {isCreating ? 'Creando...' : 'Crear Colección'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Collections List */}
      <div className="space-y-4">
        {collections.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-gray-600">
              Aún no tienes colecciones. ¡Crea una para comenzar!
            </CardContent>
          </Card>
        ) : (
          collections.map((collection) => (
            <Card key={collection.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">{collection.title}</h3>
                      {collection.status && (
                        <Badge className={getStatusColor(collection.status)}>
                          {collection.status}
                        </Badge>
                      )}
                    </div>
                    {collection.description && (
                      <p className="mt-2 text-gray-600">{collection.description}</p>
                    )}
                    {collection.createdAt && (
                      <p className="mt-2 text-sm text-gray-500">
                        Creado: {new Date(collection.createdAt).toLocaleDateString('es-ES')}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/dashboard/collections/${collection.id}`}>
                      <Button size="sm">Editar</Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteCollection(collection.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
