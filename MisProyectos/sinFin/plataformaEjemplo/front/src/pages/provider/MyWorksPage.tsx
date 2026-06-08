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
import { ConfirmDialog, useDisclosure } from "@/components/ui/primitives";
import type { Collection } from "@/types";

export default function MyWorksPage() {
  const { user } = useAuth();
  const id = user?.providerId;
  const qc = useQueryClient();
  const { data } = useQuery({ enabled: !!id, queryKey: ["collections", id], queryFn: async () => (await api.get<Collection[]>(`/collections/${id}`)).data });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);

  const create = useMutation({
    mutationFn: async () => (await api.post("/collections", { providerId: id, title, description, monthlyPrice: price })).data,
    onSuccess: () => { toast.success("Collection requested. Pending admin approval."); setTitle(""); setDescription(""); setPrice(0); qc.invalidateQueries({ queryKey: ["collections", id] }); },
  });
  const toggle = useMutation({
    mutationFn: async ({ id: cid, status }: { id: string; status: "active" | "disabled" }) => (await api.patch(`/collections/${cid}/status`, { status })).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["collections", id] }),
  });

  const dlg = useDisclosure();
  const [pending, setPending] = useState<{ id: string; status: "active" | "disabled" } | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My works</h1>

      <Card>
        <CardHeader><CardTitle>Request a new collection</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); create.mutate(); }} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} required /></div>
            <div className="space-y-2"><Label>Monthly price (USD)</Label><Input type="number" value={price} onChange={e => setPrice(+e.target.value)} required /></div>
            <div className="sm:col-span-2 space-y-2"><Label>Description</Label>
              <textarea className="w-full h-20 rounded-md border bg-background p-2 text-sm" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="sm:col-span-2"><Button type="submit" disabled={create.isPending}>Request collection</Button></div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map(c => (
          <Card key={c.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{c.title}</CardTitle>
                <Badge variant={c.status === "active" ? "success" : c.status === "pending" ? "warning" : "outline"}>{c.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{c.description}</p>
              <p className="text-sm">Price: <b>${c.monthlyPrice}/mo</b></p>
              <p className="text-xs text-muted-foreground">{c.photos.length}/10 photos · photos cannot be deleted</p>
              {c.status !== "pending" && (
                <Button size="sm" variant="outline" onClick={() => { setPending({ id: c.id, status: c.status === "active" ? "disabled" : "active" }); dlg.onOpen(); }}>
                  {c.status === "active" ? "Disable" : "Enable"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <ConfirmDialog open={dlg.open} title="Change visibility?" description="This will toggle public visibility of the collection." onCancel={dlg.onClose} onConfirm={() => { if (pending) toggle.mutate(pending); dlg.onClose(); }} />
    </div>
  );
}
