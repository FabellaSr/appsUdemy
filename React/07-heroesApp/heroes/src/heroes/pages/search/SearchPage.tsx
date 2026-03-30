import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControl } from "./ui/SearchControl";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
 

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron title={"Search Fermin"} description="Fermin Fabella Medina" />
      <CustomBreadcrumbs currentPage="Search Fermin" />
      {/* Stats Dashboard */}
      <HeroStats />
      {/* Search and Filters */}
      <SearchControl />
      
    </>
  )
}
export default SearchPage;