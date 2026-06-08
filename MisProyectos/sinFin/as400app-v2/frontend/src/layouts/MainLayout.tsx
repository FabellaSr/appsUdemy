import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

export const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link to="/" className="font-semibold tracking-tight">AS400 Tasks</Link>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}>Dashboard</NavLink>
            <NavLink to="/installations" className={({ isActive }) => isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}>Instalaciones</NavLink>
            {user?.role === 'ADMIN' && (
              <NavLink to="/admin" className={({ isActive }) => isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}>Admin</NavLink>
            )}
          </nav>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.username}</span>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => { logout(); navigate('/auth/login'); }}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto flex-1 px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};
