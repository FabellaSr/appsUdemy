import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { useSearchParams } from "react-router";

import { HeroGrid } from "@/heroes/components/HeroGrid";
import { HeroStats } from "@/heroes/components/HeroStats";
import { searchHeroesAction } from "@/heroes/actions/search-heros.action";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { SearchControl } from "./ui/SearchControl";
import { useQuery } from '@tanstack/react-query';
 

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;

  const { data: heroes = [] } = useQuery({
    queryKey: ['search', { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return (
    <>
      <CustomJumbotron title={"Search Fermin"} description="Fermin Fabella Medina" />
      <CustomBreadcrumbs currentPage="Search Fermin" />
      {/* Stats Dashboard */}
      <HeroStats />
      {/* Search and Filters */}
      <SearchControl />
      <HeroGrid heroes={heroes} />
    </>
  )
}

export default SearchPage;

