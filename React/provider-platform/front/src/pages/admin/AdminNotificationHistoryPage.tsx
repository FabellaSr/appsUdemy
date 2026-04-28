import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AppNotification } from "@/types";

export default function AdminNotificationHistoryPage() {
  const { data } = useQuery({ queryKey: ["notif-history"], queryFn: async () => (await api.get<AppNotification[]>("/notifications?all=1")).data });
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Notification history</h1>
      <Card>
        <CardContent className="pt-6">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-muted-foreground"><th className="py-2">Date</th><th>To</th><th>Kind</th><th>Title</th></tr></thead>
            <tbody>
              {data?.map(n => (
                <tr key={n.id} className="border-t">
                  <td className="py-2">{new Date(n.createdAt).toLocaleString()}</td>
                  <td>{n.to}</td>
                  <td><Badge variant="outline">{n.kind}</Badge></td>
                  <td>{n.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
