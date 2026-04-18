import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import ProviderPublicPage from './pages/ProviderPublicPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MyProfilePage from './pages/MyProfilePage';
import MyWorksPage from './pages/MyWorksPage';
import MyPaymentsPage from './pages/MyPaymentsPage';
import MyNotificationsPage from './pages/MyNotificationsPage';
import AdminProvidersPage from './pages/AdminProvidersPage';
import AdminPaymentsPage from './pages/AdminPaymentsPage';
import AdminNotificationsPage from './pages/AdminNotificationsPage';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
          <Link to="/" className="text-xl font-bold text-brand-700">Talleristas</Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" className="hover:text-brand-600">Inicio</Link>
            {!user && <Link to="/login" className="px-3 py-1.5 bg-brand-600 text-white rounded hover:bg-brand-700">Ingresar</Link>}
            {user && (
              <>
                <Link to="/dashboard" className="hover:text-brand-600">Mi panel</Link>
                <span className="text-slate-500 hidden sm:inline">{user.email}</span>
                <button onClick={logout} className="text-slate-600 hover:text-red-600">Salir</button>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/providers/:id" element={<ProviderPublicPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Privadas — proveedor */}
          <Route element={<ProtectedRoute roles={['provider', 'admin']} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/me/profile" element={<MyProfilePage />} />
            <Route path="/me/works" element={<MyWorksPage />} />
            <Route path="/me/payments" element={<MyPaymentsPage />} />
            <Route path="/me/notifications" element={<MyNotificationsPage />} />
          </Route>

          {/* Admin */}
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/admin/providers" element={<AdminProvidersPage />} />
            <Route path="/admin/payments" element={<AdminPaymentsPage />} />
            <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
          </Route>

          <Route path="*" element={<div className="text-center py-20"><h1 className="text-3xl font-bold">404</h1><p className="text-slate-500 mt-2">Página no encontrada</p></div>} />
        </Routes>
      </main>

      <footer className="border-t border-slate-200 mt-16 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Talleristas Platform
      </footer>
    </div>
  );
}
