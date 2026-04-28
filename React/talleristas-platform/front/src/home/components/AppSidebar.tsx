import { Link, useLocation } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { useAuth } from "../../auth/context/AuthContext";
import { Button } from "@/components/ui/button";

import {
  Home,
  LogIn,
  User,
  Briefcase,
  CreditCard,
  Bell,
  Building2,
} from "lucide-react";
import { CollapsibleMenuGroup } from "@/components/custom/CustomCollapsibleMenuGroup";

export function AppSidebar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { state } = useSidebar();

  const collapsed = state === "collapsed";
  const isAdmin = user?.role === "admin";

  const publicItems = [
    { to: "/", label: "Inicio", icon: Home, show: true },
    { to: "/login", label: "Ingresar", icon: LogIn, show: !user },
  ];

  const userItems = [
    { to: "/me/profile", label: "Mi perfil", icon: User, show: true },
    { to: "/me/works", label: "Mis trabajos", icon: Briefcase, show: true },
    { to: "/me/payments", label: "Mis pagos", icon: CreditCard, show: true },
    { to: "/me/notifications", label: "Mis avisos", icon: Bell, show: true },
  ];

  const adminItems = [
    { to: "/admin/providers", label: "Proveedores", icon: Building2, show: true },
    { to: "/admin/payments", label: "Pagos", icon: CreditCard, show: true },
    { to: "/admin/notifications", label: "Avisos", icon: Bell, show: true },
  ];

  const renderItems = (items: typeof publicItems) =>
    items.filter(i => i.show).map((item) => {
      const Icon = item.icon;

      return (
        <SidebarMenuItem key={item.to}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.to}
            tooltip={collapsed ? item.label : undefined}>
            <Link to={item.to}>
              <Icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });

  return (
    
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-bold truncate">
            {collapsed ? "T" : "Talleristas"}
          </Link>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>{renderItems(publicItems)}</SidebarMenu>

        {user &&
          (collapsed ? (
            <SidebarMenu>{renderItems(userItems)}</SidebarMenu>
          ) : (
            <CollapsibleMenuGroup
              label="Mi cuenta"
              items={userItems}
              pathname={pathname}
            />
          ))}

        {isAdmin &&
          (collapsed ? (
            <SidebarMenu>{renderItems(adminItems)}</SidebarMenu>
          ) : (
            <CollapsibleMenuGroup
              label="Administración"
              items={adminItems}
              pathname={pathname}
            />
          ))}
      </SidebarContent>

      {user && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton >
                {collapsed ? "" : user.email}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <Button variant="outline" size="sm" onClick={logout} className="w-full">
            Salir
          </Button>
        </SidebarFooter>
      )}
      

    </Sidebar>
  );
}