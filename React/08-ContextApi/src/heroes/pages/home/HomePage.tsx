import { useSearchParams } from "react-router"
import {
  Filter,
  Heart,
} from "lucide-react"
import { use, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"

import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs" 

import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary" 
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"


export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);
  const { data: summary } = useHeroSummary();

  const { favoriteCount, favorites} = use(FavoriteHeroContext)
  return (
    <>
      <>
        <CustomJumbotron title={"Heroes Fermin"} description="Fermin Fabella Medina" />

        <CustomBreadcrumbs currentPage="Super Héroes" />
        {/* Stats Dashboard */}
        <HeroStats />
        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">

          <TabsList className="grid w-full grid-cols-4">

            <TabsTrigger
              value="all"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'all');
                  prev.set('category', 'all');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              All Characters({summary?.totalHeroes})
            </TabsTrigger>

            <TabsTrigger value="favorites" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'favorites')
              return prev;
            })} >
              <Heart className="h-4 w-4" />
              Favorites {favoriteCount}
            </TabsTrigger>

            <TabsTrigger
              value="heroes"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'heroes');
                prev.set('category', 'hero');
                prev.set('page', '1');
                return prev;
              })}>
              Heroes ({summary?.heroCount})
            </TabsTrigger>

            <TabsTrigger
              value="villains"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'villains');
                  prev.set('category', 'villain');
                  prev.set('page', '1');
                  return prev;
                })}>
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <h1>All Characters</h1>
            <HeroGrid
              heroes={heroesResponse?.heroes || []}
            />
          </TabsContent>
          <TabsContent value="favorites">
            <HeroGrid heroes={favorites}/>
          </TabsContent>
          <TabsContent value="heroes"> 
              <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains"> 
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Results info */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">Showing 6 of 16 characters</p>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Filter className="h-3 w-3" />
              Filtered
            </Badge>
          </div>
        </div>

        {/* Pagination */}
        <CustomPagination totalPages={
          heroesResponse?.pages ?? 1
        } />
      </>
    </>
  )
}