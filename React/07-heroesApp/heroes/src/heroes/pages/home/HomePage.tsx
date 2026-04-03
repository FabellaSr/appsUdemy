import { useSearchParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import {
  Filter,
  Heart,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"

import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
import { getHeroesByPage } from "@/heroes/actions/get-heroes-by-page.action"


export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  //console.log({searchParams});
  //console.log(searchParams.get('page'));
  //console.log(searchParams.get('offset'));
  //const [activeTab, setActiveTab] = useState<"all" | "favorites" | "heroes" | "villains">("all");
  //console.log(searchParams.get('tab'));
  //setSearchParams('all');
  const { data: herosResponse } = useQuery({
    queryKey: ["heroes"],
    queryFn: () => getHeroesByPage(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
  //console.log({ herosResponse });
  const activeTab = searchParams.get('tab') ?? 'all';
  return (
    <>
      <>
        <CustomJumbotron title={"Heroes Fermin"} description="Fermin Fabella Medina" />

        <CustomBreadcrumbs currentPage="Super Héroes" />
        {/* Stats Dashboard */}
        <HeroStats />
        {/* Tabs */}
        <Tabs value={activeTab} className="mb-8">

          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all"
              /*onClick={() => setSearchParams("?tab=all")}>*/
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'all')
                return prev;
              })}>
              All Characters (16)
            </TabsTrigger>
            <TabsTrigger value="favorites" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'favorites')
              return prev;
            })} >
              <Heart className="h-4 w-4" />
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'heroes')
              return prev;
            })}>
              Heroes (12)
            </TabsTrigger>
            <TabsTrigger value="villains" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'villains')
              return prev;
            })}>
              Villains (2)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <h1>All Characters</h1>
            <HeroGrid
              heroes={herosResponse?.heroes || []}
            />
          </TabsContent>
          <TabsContent value="favorites">
            <h1>Favorite Characters</h1>
          </TabsContent>
          <TabsContent value="heroes">
            <h1>Heroes</h1>
          </TabsContent>
          <TabsContent value="villains">
            <h1>Villains</h1>
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
        <CustomPagination totalPages={16} page={16} />
      </>
    </>
  )
}