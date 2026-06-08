import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome, {user?.email}</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardHeader><CardTitle>Active collections</CardTitle></CardHeader><CardContent className="text-3xl font-bold">—</CardContent></Card>
        <Card><CardHeader><CardTitle>Pending payments</CardTitle></CardHeader><CardContent className="text-3xl font-bold">—</CardContent></Card>
        <Card><CardHeader><CardTitle>Unread notifications</CardTitle></CardHeader><CardContent className="text-3xl font-bold">—</CardContent></Card>
      </div>
    </div>
  );
}
