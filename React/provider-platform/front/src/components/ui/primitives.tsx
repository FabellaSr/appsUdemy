import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ConfirmDialog({ open, title, description, onConfirm, onCancel }: { open: boolean; title: string; description?: string; onConfirm: () => void; onCancel: () => void; }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card border rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-2">{description}</p>}
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  );
}

export function SidebarProvider({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex min-h-screen w-full", className)}>{children}</div>;
}
export function SidebarInset({ children }: { children: ReactNode }) {
  return <main className="flex-1 flex flex-col">{children}</main>;
}
export function SidebarTrigger({ onClick }: { onClick?: () => void }) {
  return <Button variant="ghost" size="icon" onClick={onClick}>☰</Button>;
}

export function useDisclosure(initial = false) {
  const [open, setOpen] = useState(initial);
  return { open, onOpen: () => setOpen(true), onClose: () => setOpen(false), toggle: () => setOpen(o => !o) };
}
