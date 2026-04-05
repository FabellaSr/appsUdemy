import { useQuery } from '@tanstack/react-query';
import { getHeroesByPage } from '../actions/get-heroes-by-page.action';

export const usePaginatedHero = (
  page: number,
  limit: number,
  category = 'all'
) => {
  return useQuery({
    queryKey: ['heroes', { page, limit, category }],
    queryFn: () => getHeroesByPage(+page, +limit, category),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
