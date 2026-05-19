import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expensesService } from '@/services/expensesService';
import type { Expense } from '@/interfaces';

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expensesService.create,

    onSuccess: (expense: Expense) => {
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });

      queryClient.setQueryData(
        ['expense', { id: expense.id }],
        expense
      );
    },
  });
}