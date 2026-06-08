import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, Briefcase, CreditCard, Bell, Users, ShieldCheck, LogOut, Sun, Moon } from "lucide-react";

const providerNav = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/profile", label: "My Profile", icon: User },
  { to: "/app/works", label: "My Works", icon: Briefcase },
  { to: "/app/payments", label: "Payments", icon: CreditCard },
  { to: "/app/notifications", label: "Notifications", icon: Bell },
];
const adminNav = [
  { to: "/admin/providers", label: "Providers", icon: Users },
  { to: "/admin/payments", label: "Payments", icon: CreditCard },
  { to: "/admin/notifications", label: "Notifications", icon: Bell },
  { to: "/admin/notifications/history", label: "Notif. History", icon: ShieldCheck },
];

export default function AppLayout() {
  const { user, logout, hasRole } = useAuth();
  const { theme, toggle } = useTheme();
  const nav = useNavigate();
  const [open, setOpen] = useState(true);
  const items = hasRole("admin", "superadmin") ? [...providerNav, ...adminNav] : providerNav;

  return (
    <SidebarProvider>
      <aside className={cn("border-r bg-card transition-all duration-300", open ? "w-64" : "w-16")}>
        <div className="h-16 flex items-center px-4 border-b font-semibold">{open ? "Provider Hub" : "PH"}</div>
        <nav className="p-2 space-y-1">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent", isActive && "bg-accent text-accent-foreground")}>
              <Icon className="h-4 w-4" />
              {open && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
      <SidebarInset>
        <header className="h-16 border-b flex items-center justify-between px-4 bg-background">
          <div className="flex items-center gap-2">
            <SidebarTrigger onClick={() => setOpen(o => !o)} />
            <span className="text-sm text-muted-foreground">{user?.email} · <b className="text-foreground capitalize">{user?.role}</b></span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggle}>{theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}</Button>
            <Button variant="outline" size="sm" onClick={() => { logout(); nav("/"); }}><LogOut className="h-4 w-4 mr-2" />Logout</Button>
          </div>
        </header>
        <div className="p-6 flex-1 overflow-auto"><Outlet /></div>
      </SidebarInset>
    </SidebarProvider>
  );
}
