import { Outlet } from "react-router";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/home/components/AppSidebar";
import { ThemeToggle } from "@/components/theme-toogle";


export const CustomMenu = () => {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
      <ThemeToggle />
      <SidebarInset className="min-h-screen flex flex-col bg-blue-50">
        <main className="flex-1 text-slate-900">
          <Outlet />
        </main>

        <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Talleristas Platform
        </footer>
      </SidebarInset>
      </SidebarProvider>
      
    </TooltipProvider>
  );
};