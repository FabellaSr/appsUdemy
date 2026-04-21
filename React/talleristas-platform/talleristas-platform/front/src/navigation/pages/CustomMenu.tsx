import { Link, Outlet } from 'react-router';
import { PublicNavigation } from '../components/PublicNavigation';

export const CustomMenu = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
          <Link to="/" className="text-xl font-bold text-brand-700">
            Talleristas
          </Link>
          <PublicNavigation />
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 mt-16 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Talleristas Platform
      </footer>
    </div>
  );
};