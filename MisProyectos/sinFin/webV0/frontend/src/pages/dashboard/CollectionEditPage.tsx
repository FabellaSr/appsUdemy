import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface CollectionDetail {
  id: string;
  title: string;
  description?: string;
  status?: 'draft' | 'pending' | 'published' | 'hidden';
  images?: Array<{
    id: string;
    url: string;
    title?: string;
  }>;
}

export default function CollectionEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [collection, setCollection] = useState<CollectionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    async function loadCollection() {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await api.getCollection(id);
        setCollection(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar colección');
        console.error('[v0] Error loading collection:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCollection();
  }, [id]);

  const handleChange = (field: string, value: string) => {
    if (!collection) return;
    setCollection({ ...collection, [field]: value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collection || !id) return;

    try {
      setIsSaving(true);
      await api.updateCollection(id, {
        title: collection.title,
        description: collection.description,
      });
      setSuccess('Colección actualizada exitosamente');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar colección');
      console.error('[v0] Error updating collection:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !id) return;

    try {
      setIsUploading(true);
      await api.uploadCollectionImage(id, selectedFile);
      setSelectedFile(null);
      setSuccess('Imagen subida exitosamente');
      setTimeout(() => setSuccess(null), 3000);

      // Reload collection
      const updated = await api.getCollection(id);
      setCollection(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir imagen');
      console.error('[v0] Error uploading image:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!id) return;

    try {
      await api.deleteCollectionImage(id, imageId);
      setSuccess('Imagen eliminada exitosamente');
      setTimeout(() => setSuccess(null), 3000);

      // Reload collection
      const updated = await api.getCollection(id);
      setCollection(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar imagen');
      console.error('[v0] Error deleting image:', err);
    }
  };

  const handleRequestPublication = async () => {
    if (!id) return;

    try {
      await api.requestPublication(id);
      setSuccess('Solicitud de publicación enviada');
      const updated = await api.getCollection(id);
      setCollection(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al solicitar publicación');
      console.error('[v0] Error requesting publication:', err);
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-600">Cargando colección...</div>;
  }

  if (error && !collection) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
        <Button onClick={() => navigate('/dashboard/collections')}>Volver</Button>
      </div>
    );
  }

  if (!collection) {
    return <div className="text-center text-gray-600">Colección no encontrada</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Colección</h1>
          <p className="mt-2 text-gray-600">Gestiona los detalles y contenido de tu colección</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/dashboard/collections')}>
          Volver
        </Button>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}
      {success && <div className="rounded-lg bg-green-50 p-4 text-green-700">{success}</div>}

      {/* Edit Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Información de la Colección</CardTitle>
            {collection.status && (
              <Badge>{collection.status}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={collection.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={collection.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
              {collection.status === 'draft' && (
                <Button type="button" onClick={handleRequestPublication} variant="outline">
                  Solicitar Publicación
                </Button>
              )}
              {collection.status === 'published' && (
                <Button type="button" variant="outline" disabled>
                  Publicado
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Upload Images */}
      <Card>
        <CardHeader>
          <CardTitle>Subir Imágenes</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUploadImage} className="space-y-4">
            <div>
              <Label htmlFor="file">Seleccionar archivo</Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
            </div>
            <Button type="submit" disabled={!selectedFile || isUploading}>
              {isUploading ? 'Subiendo...' : 'Subir Imagen'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Images Grid */}
      {collection.images && collection.images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Imágenes ({collection.images.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {collection.images.map((image) => (
                <div key={image.id} className="relative">
                  <img src={image.url} alt={image.title} className="h-40 w-full rounded-lg object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
