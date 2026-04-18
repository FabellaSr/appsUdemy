import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wallet, Users, TrendingUp, PieChart } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Gastos Familiares</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Iniciar sesion</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Controla los gastos de tu familia de forma simple
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Registra, organiza y visualiza los gastos de cada miembro de tu familia. 
            Toma mejores decisiones financieras con informacion clara y accesible.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/auth/sign-up">Comenzar gratis</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">Ya tengo una cuenta</Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-3 gap-6 pt-12">
            <div className="p-6 rounded-xl bg-card border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Miembros de familia</h3>
              <p className="text-sm text-muted-foreground">
                Registra a cada integrante y lleva un control individual de sus gastos.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-card border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Seguimiento mensual</h3>
              <p className="text-sm text-muted-foreground">
                Visualiza los gastos mes a mes y compara periodos anteriores.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-card border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <PieChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Estadisticas claras</h3>
              <p className="text-sm text-muted-foreground">
                Graficos y reportes que te ayudan a entender donde va tu dinero.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Gastos Familiares - Maneja tus finanzas familiares con facilidad
        </div>
      </footer>
    </div>
  )
}
