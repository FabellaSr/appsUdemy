import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControl } from "./ui/SearchControl";
 

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron title={"Search Fermin"} description="Fermin Fabella Medina" />
      {/* Stats Dashboard */}
      <HeroStats />
      {/* Search and Filters */}
      <SearchControl />
      
    </>
  )
}
export default SearchPage;