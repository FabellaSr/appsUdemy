import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Notifications</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card><CardHeader><CardTitle>Send new</CardTitle></CardHeader><CardContent><Link to="/admin/notifications/new"><Button>Compose notification</Button></Link></CardContent></Card>
        <Card><CardHeader><CardTitle>History</CardTitle></CardHeader><CardContent><Link to="/admin/notifications/history"><Button variant="outline">View history</Button></Link></CardContent></Card>
      </div>
    </div>
  );
}
