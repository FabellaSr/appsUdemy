import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Public pages
import HomePage from './pages/public/HomePage';
import TalleristasPage from './pages/public/TalleristasPage';
import TalleristaDetailPage from './pages/public/TalleristaDetailPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Dashboard pages (Tallerista)
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import CollectionsPage from './pages/dashboard/CollectionsPage';
import CollectionEditPage from './pages/dashboard/CollectionEditPage';
import PaymentsPage from './pages/dashboard/PaymentsPage';
import MessagesPage from './pages/dashboard/MessagesPage';

// Admin pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminCollectionsPage from './pages/admin/AdminCollectionsPage';
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage';
import AdminPricingPage from './pages/admin/AdminPricingPage';

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/talleristas" element={<TalleristasPage />} />
        <Route path="/talleristas/:id" element={<TalleristaDetailPage />} />
      </Route>

      {/* Auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Dashboard routes (Tallerista) */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['tallerista']}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/collections" element={<CollectionsPage />} />
        <Route path="/dashboard/collections/:id" element={<CollectionEditPage />} />
        <Route path="/dashboard/payments" element={<PaymentsPage />} />
        <Route path="/dashboard/messages" element={<MessagesPage />} />
      </Route>

      {/* Admin routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/collections" element={<AdminCollectionsPage />} />
        <Route path="/admin/payments" element={<AdminPaymentsPage />} />
        <Route path="/admin/pricing" element={<AdminPricingPage />} />
      </Route>
    </Routes>
  );
}
