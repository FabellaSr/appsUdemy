import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/services/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Provider, Collection } from "@/types";

export default function AdminProvidersPage() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const { data: providers } = useQuery({ queryKey: ["providers"], queryFn: async () => (await api.get<Provider[]>("/providers")).data });
  const { data: collections } = useQuery({ queryKey: ["all-collections"], queryFn: async () => (await api.get<Collection[]>("/collections")).data });

  const approve = useMutation({
    mutationFn: async (id: string) => (await api.patch(`/collections/${id}/status`, { status: "active" })).data,
    onSuccess: () => { toast.success("Approved"); qc.invalidateQueries({ queryKey: ["all-collections"] }); },
  });

  const filtered = providers?.filter(p => p.businessName.toLowerCase().includes(q.toLowerCase())) ?? [];
  const pending = collections?.filter(c => c.status === "pending") ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Providers</h1>
      <Input placeholder="Search providers…" value={q} onChange={e => setQ(e.target.value)} className="max-w-md" />

      <Card>
        <CardHeader><CardTitle>Pending collections ({pending.length})</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {pending.map(c => (
            <div key={c.id} className="flex items-center justify-between border rounded p-3">
              <div><b>{c.title}</b> <span className="text-xs text-muted-foreground">— provider {c.providerId}</span><p className="text-sm text-muted-foreground">{c.description}</p></div>
              <Button size="sm" onClick={() => approve.mutate(c.id)}>Approve</Button>
            </div>
          ))}
          {pending.length === 0 && <p className="text-sm text-muted-foreground">No pending collections.</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>All providers</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-muted-foreground"><th className="py-2">Business</th><th>Category</th><th>Email</th><th>Phone</th></tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="py-2">{p.businessName}</td>
                  <td><Badge variant="outline">{p.category}</Badge></td>
                  <td>{p.email}</td><td>{p.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
