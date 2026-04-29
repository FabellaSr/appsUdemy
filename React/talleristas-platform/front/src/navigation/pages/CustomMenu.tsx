import { Outlet } from "react-router";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/home/components/AppSidebar";


export const CustomMenu = () => {
  return (

    <TooltipProvider>

      <SidebarProvider>
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
      <SidebarInset className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Talleristas Platform
      </SidebarInset>
    </TooltipProvider>
  );
};