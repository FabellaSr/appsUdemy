"use client"

import { useTransition } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Users } from "lucide-react"
import { FamilyMemberForm } from "./family-member-form"
import { deleteFamilyMember } from "@/lib/actions"
import type { FamilyMember } from "@/lib/types"

interface FamilyMembersListProps {
  members: FamilyMember[]
}

export function FamilyMembersList({ members }: FamilyMembersListProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este miembro? También se eliminarán sus gastos.")) return
    startTransition(async () => {
      await deleteFamilyMember(id)
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Users className="h-5 w-5 text-muted-foreground" />
          Miembros de la familia
        </CardTitle>
        <FamilyMemberForm />
      </CardHeader>
      <CardContent>
        {members.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No hay miembros registrados. Agrega el primer miembro de tu familia.
          </p>
        ) : (
          <div className="space-y-2">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{ backgroundColor: member.avatar_color }}
                  >
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{member.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(member.id)}
                  disabled={isPending}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
