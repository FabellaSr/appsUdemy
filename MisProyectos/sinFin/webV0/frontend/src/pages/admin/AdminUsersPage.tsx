import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'tallerista';
  isActive?: boolean;
  createdAt?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await api.adminGetUsers();
      setUsers(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar usuarios');
      console.error('[v0] Error loading users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (userId: string) => {
    try {
      await api.adminToggleUserStatus(userId);
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar estado del usuario');
      console.error('[v0] Error toggling user status:', err);
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-600">Cargando usuarios...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
        <p className="mt-2 text-gray-600">Administra los usuarios del sistema</p>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      {users.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-gray-600">
            No hay usuarios registrados
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline">{user.role}</Badge>
                      <Badge variant={user.isActive ? 'default' : 'secondary'}>
                        {user.isActive ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </div>
                    {user.createdAt && (
                      <p className="mt-2 text-sm text-gray-500">
                        Registrado: {new Date(user.createdAt).toLocaleDateString('es-ES')}
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={() => handleToggleStatus(user.id)}
                    variant={user.isActive ? 'destructive' : 'default'}
                  >
                    {user.isActive ? 'Desactivar' : 'Activar'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
