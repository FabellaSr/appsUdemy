import { useEffect, useState } from 'react';
import { categoriesService } from '@/services/categoriesService';
import type { Category } from '@/interfaces';

export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    categoriesService.list().then(setData).finally(() => setLoading(false));
  }, []);
  return { data, loading, setData };
}
