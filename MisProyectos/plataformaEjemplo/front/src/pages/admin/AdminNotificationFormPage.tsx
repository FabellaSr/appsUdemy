import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { NotificationKind } from "@/types";

export default function AdminNotificationFormPage() {
  const nav = useNavigate();
  const [to, setTo] = useState("all");
  const [kind, setKind] = useState<NotificationKind>("announcement");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const m = useMutation({
    mutationFn: async () => (await api.post("/notifications", { to, kind, title, body })).data,
    onSuccess: () => { toast.success("Notification sent"); nav("/admin/notifications/history"); },
  });
  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-3xl font-bold">Send notification</h1>
      <Card>
        <CardHeader><CardTitle>Compose</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); m.mutate(); }} className="space-y-4">
            <div className="space-y-2"><Label>Recipient (providerId or "all")</Label><Input value={to} onChange={e => setTo(e.target.value)} /></div>
            <div className="space-y-2"><Label>Kind</Label>
              <select value={kind} onChange={e => setKind(e.target.value as NotificationKind)} className="h-10 w-full rounded-md border bg-background px-3 text-sm">
                <option value="announcement">announcement</option>
                <option value="payment_expiring">payment_expiring</option>
                <option value="payment_overdue">payment_overdue</option>
              </select>
            </div>
            <div className="space-y-2"><Label>Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} required /></div>
            <div className="space-y-2"><Label>Body</Label><textarea className="w-full h-28 rounded-md border bg-background p-2 text-sm" value={body} onChange={e => setBody(e.target.value)} required /></div>
            <Button type="submit" disabled={m.isPending}>Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
