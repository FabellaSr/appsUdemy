import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { Role } from '@/interfaces';

interface Props { roles?: Role[] }

export const RequireAuth = ({ roles }: Props) => {
  const { token, user } = useAuth();
  const location = useLocation();
  if (!token || !user) return <Navigate to="/auth/login" replace state={{ from: location }} />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return <Outlet />;
};
