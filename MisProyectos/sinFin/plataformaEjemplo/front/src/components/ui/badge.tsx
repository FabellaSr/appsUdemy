import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
export function Badge({ className, variant = "default", ...p }: HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" | "success" | "warning" | "destructive" }) {
  const styles: Record<string, string> = {
    default: "bg-primary text-primary-foreground",
    outline: "border border-input",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    warning: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    destructive: "bg-destructive/15 text-destructive",
  };
  return <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", styles[variant], className)} {...p} />;
}
