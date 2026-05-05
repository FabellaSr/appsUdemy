import { useAuth } from "../../auth/context/AuthContext"
import { Item, ItemGroup } from "@/components/ui/item"
import { CustomCard } from "@/components/custom/CustomCard"

export function DashboardPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"

  const cards = isAdmin
    ? [
        { to: "/admin/providers", title: "Proveedores", desc: "Alta, baja y modificación" },
        { to: "/admin/payments", title: "Pagos", desc: "Registrar y consultar pagos" },
        { to: "/admin/notifications", title: "Avisos", desc: "Enviar notificaciones" },
      ]
    : [
        { to: "/me/profile", title: "Mi perfil", desc: "Editar mis datos" },
        { to: "/me/works", title: "Mis trabajos", desc: "Subir fotos y administrar" },
        { to: "/me/payments", title: "Mis pagos", desc: "Pagos realizados o pendientes" },
        { to: "/me/notifications", title: "Mis avisos", desc: "Notificaciones recibidas" },
      ]

  return (
    <section className="flex min-h-[calc(100vh-80px)] w-full items-start justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-2xl">
        <ItemGroup className="gap-4">
          {cards.map((c) => (
            <Item key={c.title} variant="outline" asChild role="listitem">
              <a href={c.to}>
                <CustomCard title={c.title} desc={c.desc} />
              </a>
            </Item>
          ))}
        </ItemGroup>
      </div>
    </section>
  )
}