import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Provider } from "@/types";

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["providers"],
    queryFn: async () => (await api.get<Provider[]>("/providers")).data,
  });
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Provider Showcase</h1>
          <Link to="/login"><Button>Sign in</Button></Link>
        </div>
      </header>
      <section className="container py-12">
        <h2 className="text-4xl font-bold tracking-tight">Find trusted professionals</h2>
        <p className="text-muted-foreground mt-2">Blacksmiths · Carpenters · Electricians · Painters · Plumbers</p>
      </section>
      <section className="container pb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && <p>Loading…</p>}
        {data?.map(p => (
          <Link key={p.id} to={`/p/${p.id}`}>
            <Card className="hover:shadow-lg transition">
              <img src={p.profileImage} alt={p.businessName} className="w-full h-40 object-cover rounded-t-lg" />
              <CardHeader>
                <CardTitle>{p.businessName}</CardTitle>
                <CardDescription>{p.category}</CardDescription>
              </CardHeader>
              <CardContent><p className="text-sm line-clamp-2">{p.description}</p></CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
