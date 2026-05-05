import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  Image,
  CreditCard,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Shield,
} from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Usuarios', href: '/admin/users', icon: Users },
    { name: 'Colecciones', href: '/admin/collections', icon: Image },
    { name: 'Pagos', href: '/admin/payments', icon: CreditCard },
    { name: 'Precios', href: '/admin/pricing', icon: DollarSign },
    { name: 'Configuración', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-800 shadow-lg transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
              <Shield className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold text-white">Admin Panel</span>
          </Link>
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 font-medium">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="truncate text-xs text-gray-400">Administrador</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-700 bg-gray-800 px-4 lg:px-8">
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-400" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 hover:bg-gray-700">
              <Bell className="h-5 w-5 text-gray-400" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Ver Sitio
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-300 hover:bg-gray-700">
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
