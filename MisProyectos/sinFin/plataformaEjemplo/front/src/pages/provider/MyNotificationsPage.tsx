import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AppNotification } from "@/types";

export default function MyNotificationsPage() {
  const { data } = useQuery({ queryKey: ["notifications"], queryFn: async () => (await api.get<AppNotification[]>("/notifications")).data });
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Notifications</h1>
      <div className="grid gap-3">
        {data?.map(n => (
          <Card key={n.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{n.title}</CardTitle>
                <Badge variant={n.kind === "payment_overdue" ? "destructive" : n.kind === "payment_expiring" ? "warning" : "default"}>{n.kind}</Badge>
              </div>
            </CardHeader>
            <CardContent><p className="text-sm">{n.body}</p><p className="text-xs text-muted-foreground mt-2">{new Date(n.createdAt).toLocaleString()}</p></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
