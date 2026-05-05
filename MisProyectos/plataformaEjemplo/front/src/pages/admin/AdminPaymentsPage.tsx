import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/services/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Payment } from "@/types";

export default function AdminPaymentsPage() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["all-payments"], queryFn: async () => (await api.get<Payment[]>("/payments")).data });
  const confirm = useMutation({
    mutationFn: async (id: string) => (await api.patch(`/payments/${id}/confirm`)).data,
    onSuccess: () => { toast.success("Confirmed"); qc.invalidateQueries({ queryKey: ["all-payments"] }); },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Payments</h1>
      <Card>
        <CardHeader><CardTitle>All notified payments</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-muted-foreground"><th className="py-2">Provider</th><th>Date</th><th>Receipt</th><th>Amount</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {data?.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="py-2">{p.providerId}</td>
                  <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
                  <td>{p.receiptNumber}</td>
                  <td>${p.amount}</td>
                  <td><Badge variant={p.status === "confirmed" ? "success" : p.status === "overdue" ? "destructive" : "warning"}>{p.status}</Badge></td>
                  <td>{p.status === "pending" && <Button size="sm" onClick={() => confirm.mutate(p.id)}>Confirm</Button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
