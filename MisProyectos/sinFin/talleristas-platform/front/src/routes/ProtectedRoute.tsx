import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../auth/context/AuthContext';
import type { Role } from '../types';

export default function ProtectedRoute({ roles }: { roles: Role[] }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center py-12 text-slate-500">Cargando…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/" replace />;
  return <Outlet />;
}
