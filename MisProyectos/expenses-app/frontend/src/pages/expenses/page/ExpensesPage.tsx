import { useState } from 'react';
import { toast } from 'sonner'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/EmptyState';
import { ExpenseFormDialog } from '../components/ExpensesFormDialog';

import { useExpenses } from '@/pages/expenses/hooks/useExpenses';
import { useCategories } from '@/hooks/useCategories';

import NotFoundPage from '@/pages/NotFoundPage';
import type { Expense } from '@/interfaces';
import { useCreateExpense } from '@/pages/expenses/hooks/useCreateExpense';
import { useMembers } from '@/pages/members/hooks/useMembers';


export const ExpensesPage = () => {
  const [open, setOpen] = useState(false); 
 
  const { data: expenses, error } = useExpenses( 
  );
  const { data: categories } = useCategories();
  const createExpenseMutation = useCreateExpense();
  const { data: users } = useMembers();

  
  const handleSubmit = async (expenseLike: Partial<Expense>) => {
    const formData = new FormData();
    formData.append('date', expenseLike.date!);
    formData.append('categoryId', expenseLike.categoryId!);
    formData.append('concept', expenseLike.concept!);
    formData.append('amount', String(expenseLike.amount));
 
    try {
      await createExpenseMutation.mutateAsync(formData);
      toast.success('Gasto creado correctamente');
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('Error al crear el gasto');
    }
  };

  if (error) {
    return (
      <div className="p-6 text-red-500">
        <NotFoundPage></NotFoundPage>
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
          {expenses.length === 0 ? (
            <EmptyState title="Sin gastos" description="Cargá el primer gasto del mes." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr><th className="py-2">Fecha</th><th>Categoría</th><th>Concepto</th><th>Usuario</th><th className="text-right">Monto</th></tr>
                </thead>
                <tbody>
                  {expenses.map((e) => (
                    <tr key={e.id} className="border-t">
                      <td className="py-2">{e.date}</td>
                      <td>{categories.find((c) => c.id === e.categoryId)?.name}</td>
                      <td>{e.concept}</td>
                      <td>{users.find((c) => c.authId === e.userId)?.name }</td>
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
        onSubmit={handleSubmit}
        isPending={createExpenseMutation.isPending}
      />
    </div>
  );
}




