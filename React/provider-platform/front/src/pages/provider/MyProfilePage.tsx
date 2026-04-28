import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { api } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Provider } from "@/types";

export default function MyProfilePage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const id = user?.providerId;
  const { data } = useQuery({ enabled: !!id, queryKey: ["provider", id], queryFn: async () => (await api.get<Provider>(`/providers/${id}`)).data });
  const [form, setForm] = useState<Partial<Provider>>({});
  useEffect(() => { if (data) setForm(data); }, [data]);
  const m = useMutation({
    mutationFn: async (p: Partial<Provider>) => (await api.put(`/providers/${id}`, p)).data,
    onSuccess: () => { toast.success("Profile saved"); qc.invalidateQueries({ queryKey: ["provider", id] }); },
    onError: () => toast.error("Could not save"),
  });

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold">My profile</h1>
      <Card>
        <CardHeader><CardTitle>Business information</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); m.mutate(form); }} className="grid gap-4 sm:grid-cols-2">
            {(["businessName","category","phone","whatsapp","email","location","profileImage"] as const).map(k => (
              <div key={k} className="space-y-2">
                <Label className="capitalize">{k}</Label>
                <Input value={(form as any)[k] ?? ""} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
              </div>
            ))}
            <div className="sm:col-span-2 space-y-2">
              <Label>Description</Label>
              <textarea className="w-full h-24 rounded-md border bg-background p-2 text-sm" value={form.description ?? ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="sm:col-span-2"><Button type="submit" disabled={m.isPending}>{m.isPending ? "Saving…" : "Save"}</Button></div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
