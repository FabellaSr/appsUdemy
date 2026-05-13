import { useEffect, useState } from 'react';
import { expensesService } from '@/services/expensesService';
import type { Expense } from '@/interfaces';

export function useExpenses(params?: { month?: number; year?: number }) {
  const [data, setData] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    expensesService
      .list(params)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [params?.month, params?.year]);

  return { data, loading, error, setData };
}
