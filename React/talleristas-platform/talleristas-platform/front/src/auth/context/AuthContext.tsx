import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '../api/endpoints';
import type { User } from '../../types';

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }
    auth.me().then((r) => setUser(r.data)).catch(() => {
      localStorage.removeItem('token');
    }).finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const r = await auth.login(email, password);
    localStorage.setItem('token', r.data.access_token);
    setUser(r.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return <Ctx.Provider value={{ user, loading, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
