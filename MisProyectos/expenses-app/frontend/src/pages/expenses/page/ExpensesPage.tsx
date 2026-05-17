import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; 
import { EmptyState } from '@/components/shared/EmptyState';
import { useExpenses } from '@/hooks/useExpenses';
import { useCategories } from '@/hooks/useCategories';
import { ExpensesLoading } from '../components/ExpensesLoadingComponent';
import { ExpenseFormDialog } from '../components/ExpensesFormDialog';

export default function ExpensesPage() {
  const [open, setOpen] = useState(false);
  //const [items] = useState(mockExpenses);
  const { data: items, loading, error,  reload } = useExpenses();
  const { data:categories, loading:categoriesLoading } = useCategories();
  if (loading) {
    return <ExpensesLoading />;
  }
  if (categoriesLoading) {
    return <ExpensesLoading />;
  }
    if (error) {
    return (
      <div className="p-6 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Gastos</h1>
        <Button onClick={() => setOpen(true)}>
          Nuevo gasto
        </Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Listado</CardTitle></CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <EmptyState title="Sin gastos" description="Cargá el primer gasto del mes." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr><th className="py-2">Fecha</th><th>Categoría</th><th>Concepto</th><th className="text-right">Monto</th></tr>
                </thead>
                <tbody>
                  {items.map((e) => (
                    <tr key={e.id} className="border-t">
                      <td className="py-2">{e.date}</td>
                      <td>{categories.find((c) => c.id === e.categoryId)?.name}</td>
                      <td>{e.concept}</td>
                      <td className="text-right">${e.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      <ExpenseFormDialog
        open={open}
        onOpenChange={setOpen}
        categories={categories}
        onCreated={reload}
      />
    </div>
  );
}
