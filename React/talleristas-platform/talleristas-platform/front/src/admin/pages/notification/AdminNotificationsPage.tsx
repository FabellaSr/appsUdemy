import { Item, ItemGroup } from "@/components/ui/item"
import { CustomCard } from "@/components/custom/CustomCard"

export function AdminNotificationsPage() {
  const cards = [
    {
      to: "/admin/notifications/new",
      title: "Nuevo aviso",
      desc: "Crear y enviar una notificación a un proveedor",
    },
    {
      to: "/admin/notifications/history",
      title: "Avisos históricos",
      desc: "Consultar las notificaciones enviadas anteriormente",
    },
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