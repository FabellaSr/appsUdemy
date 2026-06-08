import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Payment } from "@/types";

export default function MyPaymentsPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["payments", user?.providerId], queryFn: async () => (await api.get<Payment[]>(`/payments?providerId=${user?.providerId}`)).data });
  const [amount, setAmount] = useState(0);
  const [receipt, setReceipt] = useState("");

  const notify = useMutation({
    mutationFn: async () => (await api.post("/payments", { providerId: user?.providerId, amount, receiptNumber: receipt })).data,
    onSuccess: () => { toast.success("Payment notified"); setAmount(0); setReceipt(""); qc.invalidateQueries({ queryKey: ["payments", user?.providerId] }); },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payments</h1>
      <Card>
        <CardHeader><CardTitle>Notify a payment</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); notify.mutate(); }} className="grid gap-4 sm:grid-cols-3 items-end">
            <div className="space-y-2"><Label>Amount</Label><Input type="number" value={amount} onChange={e => setAmount(+e.target.value)} required /></div>
            <div className="space-y-2"><Label>Receipt #</Label><Input value={receipt} onChange={e => setReceipt(e.target.value)} required /></div>
            <Button type="submit" disabled={notify.isPending}>Notify</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>History</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-muted-foreground"><th className="py-2">Date</th><th>Receipt</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {data?.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="py-2">{new Date(p.paymentDate).toLocaleDateString()}</td>
                  <td>{p.receiptNumber}</td>
                  <td>${p.amount}</td>
                  <td><Badge variant={p.status === "confirmed" ? "success" : p.status === "overdue" ? "destructive" : "warning"}>{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
