import { useEffect, useState } from "react"
import { notifications } from "../../../auth/api/endpoints"
import type { Notification } from "../../../types"

import {
  CardContent,
} from "@/components/ui/card"
import { CardPageHeader } from "@/components/custom/CardPageHeader"

export function AdminNotificationHistoryPage() {
  const [list, setList] = useState<Notification[]>([])

  useEffect(() => {
    notifications.list().then((r) => setList(r.data))
  }, [])

  return (
    <CardPageHeader
      title="Historial de notificaciones"
      description="Revisá las notificaciones que se han enviado a los usuarios."
    >
      <CardContent className="pt-6">
        {list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <p className="text-sm font-medium text-slate-700">
              Todavía no hay avisos cargados.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((n) => (
              <div
                key={n.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <span className="text-sm font-semibold text-slate-900">
                    {n.title}
                  </span>

                  <span className="text-xs text-slate-400">
                    {n.provider?.fullName} ·{" "}
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {n.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </CardPageHeader>
  )
}