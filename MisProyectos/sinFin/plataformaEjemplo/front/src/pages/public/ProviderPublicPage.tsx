import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Provider, Collection } from "@/types";

export default function ProviderPublicPage() {
  const { id } = useParams<{ id: string }>();
  const { data: provider } = useQuery({ queryKey: ["provider", id], queryFn: async () => (await api.get<Provider>(`/providers/${id}`)).data });
  const { data: collections } = useQuery({ queryKey: ["collections", id], queryFn: async () => (await api.get<Collection[]>(`/collections/${id}`)).data });
  const active = collections?.filter(c => c.status === "active") ?? [];

  if (!provider) return <div className="p-8">Loading…</div>;
  return (
    <div className="container py-8 space-y-6">
      <Card>
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <img src={provider.profileImage} alt={provider.businessName} className="w-40 h-40 rounded-full object-cover" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{provider.businessName}</h1>
            <Badge className="mt-1">{provider.category}</Badge>
            <p className="mt-2 text-muted-foreground">{provider.description}</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
              <div>📞 {provider.phone}</div>
              <div>💬 {provider.whatsapp}</div>
              <div>✉️ {provider.email}</div>
              <div>📍 {provider.location}</div>
            </div>
          </div>
        </div>
      </Card>
      <h2 className="text-2xl font-semibold">Active collections</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {active.map(c => (
          <Card key={c.id}>
            {c.photos[0] && <img src={c.photos[0]} className="w-full h-40 object-cover rounded-t-lg" alt={c.title} />}
            <CardHeader><CardTitle>{c.title}</CardTitle><CardDescription>${c.monthlyPrice}/mo</CardDescription></CardHeader>
            <CardContent><p className="text-sm">{c.description}</p></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
