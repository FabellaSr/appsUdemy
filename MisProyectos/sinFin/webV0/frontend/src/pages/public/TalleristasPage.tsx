import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Tallerista {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  occupation?: string;
  city?: string;
  state?: string;
  profileImage?: string;
  description?: string;
  collectionsCount?: number;
}

export default function TalleristasPage() {
  const [talleristas, setTalleristas] = useState<Tallerista[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [occupations, setOccupations] = useState<string[]>([]);
  const [selectedOccupation, setSelectedOccupation] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [occupationsData, talleristasData] = await Promise.all([
          api.getOccupations(),
          api.getTalleristas(),
        ]);
        setOccupations(occupationsData);
        setTalleristas(talleristasData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar talleristas');
        console.error('[v0] Error loading talleristas:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const filtered = await api.getTalleristas({
        search: searchTerm,
        occupation: selectedOccupation || undefined,
      });
      setTalleristas(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en la búsqueda');
      console.error('[v0] Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Talleristas Profesionales</h1>
          <p className="text-lg text-gray-600">
            Descubre y conecta con fotógrafos y talleres especializados
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-12">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <Input
                  placeholder="Buscar por nombre o especialidad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <select
                  value={selectedOccupation}
                  onChange={(e) => setSelectedOccupation(e.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2"
                >
                  <option value="">Todas las especialidades</option>
                  {occupations.map((occupation) => (
                    <option key={occupation} value={occupation}>
                      {occupation}
                    </option>
                  ))}
                </select>
                <Button type="submit" className="whitespace-nowrap">
                  Buscar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && <div className="text-center text-gray-600">Cargando talleristas...</div>}

        {/* Error State */}
        {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

        {/* Talleristas Grid */}
        {!isLoading && talleristas.length === 0 && (
          <div className="text-center text-gray-600">No se encontraron talleristas</div>
        )}

        {!isLoading && talleristas.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {talleristas.map((tallerista) => (
              <Link key={tallerista.id} to={`/talleristas/${tallerista.id}`}>
                <Card className="h-full transition-transform hover:scale-105">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {tallerista.firstName} {tallerista.lastName}
                        </h3>
                        {tallerista.occupation && (
                          <Badge variant="outline" className="mt-2">
                            {tallerista.occupation}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {tallerista.city && tallerista.state
                        ? `${tallerista.city}, ${tallerista.state}`
                        : 'Ubicación no especificada'}
                    </p>
                    {tallerista.collectionsCount !== undefined && (
                      <p className="mt-2 text-sm text-gray-500">
                        {tallerista.collectionsCount} colecciones
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
