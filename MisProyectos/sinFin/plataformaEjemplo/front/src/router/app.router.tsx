import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import HomePage from "@/pages/public/HomePage";
import LoginPage from "@/pages/public/LoginPage";
import ProviderPublicPage from "@/pages/public/ProviderPublicPage";
import DashboardPage from "@/pages/provider/DashboardPage";
import MyProfilePage from "@/pages/provider/MyProfilePage";
import MyWorksPage from "@/pages/provider/MyWorksPage";
import MyPaymentsPage from "@/pages/provider/MyPaymentsPage";
import MyNotificationsPage from "@/pages/provider/MyNotificationsPage";
import AdminProvidersPage from "@/pages/admin/AdminProvidersPage";
import AdminPaymentsPage from "@/pages/admin/AdminPaymentsPage";
import AdminNotificationsPage from "@/pages/admin/AdminNotificationsPage";
import AdminNotificationFormPage from "@/pages/admin/AdminNotificationFormPage";
import AdminNotificationHistoryPage from "@/pages/admin/AdminNotificationHistoryPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/p/:id" element={<ProviderPublicPage />} />

      <Route element={<ProtectedRoute roles={["provider","admin","superadmin"]}><AppLayout /></ProtectedRoute>}>
        <Route path="/app/dashboard" element={<DashboardPage />} />
        <Route path="/app/profile" element={<MyProfilePage />} />
        <Route path="/app/works" element={<MyWorksPage />} />
        <Route path="/app/payments" element={<MyPaymentsPage />} />
        <Route path="/app/notifications" element={<MyNotificationsPage />} />
      </Route>

      <Route element={<ProtectedRoute roles={["admin","superadmin"]}><AppLayout /></ProtectedRoute>}>
        <Route path="/admin/providers" element={<AdminProvidersPage />} />
        <Route path="/admin/payments" element={<AdminPaymentsPage />} />
        <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
        <Route path="/admin/notifications/new" element={<AdminNotificationFormPage />} />
        <Route path="/admin/notifications/history" element={<AdminNotificationHistoryPage />} />
      </Route>

      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
