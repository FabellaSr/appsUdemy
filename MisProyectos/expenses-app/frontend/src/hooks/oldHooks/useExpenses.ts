import { useCallback, useEffect, useState } from 'react';
import { expensesService } from '@/services/expensesService';
import type { Expense } from '@/interfaces';

export function useExpenses(params?: { month?: number; year?: number }) {
  const [data, setData] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      const result = await expensesService.list(params);
      setData(result);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [params?.month, params?.year]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, error, setData,reload };
}
