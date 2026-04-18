"use client"

import { useTransition } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Receipt } from "lucide-react"
import { deleteExpense } from "@/lib/actions"
import type { ExpenseWithRelations } from "@/lib/types"

interface ExpensesListProps {
  expenses: ExpenseWithRelations[]
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(amount)
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
  }).format(date)
}

export function ExpensesList({ expenses }: ExpensesListProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este gasto?")) return
    startTransition(async () => {
      await deleteExpense(id)
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Receipt className="h-5 w-5 text-muted-foreground" />
          Gastos recientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {expenses.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No hay gastos registrados este mes.
          </p>
        ) : (
          <div className="space-y-2">
            {expenses.slice(0, 10).map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
                    style={{ backgroundColor: expense.family_members?.avatar_color || "#6b7280" }}
                  >
                    {expense.family_members?.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{expense.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{expense.family_members?.name}</span>
                      {expense.expense_categories && (
                        <>
                          <span>•</span>
                          <span
                            className="px-2 py-0.5 rounded-full text-xs"
                            style={{ 
                              backgroundColor: `${expense.expense_categories.color}20`,
                              color: expense.expense_categories.color
                            }}
                          >
                            {expense.expense_categories.name}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(Number(expense.amount))}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(expense.expense_date)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(expense.id)}
                    disabled={isPending}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
