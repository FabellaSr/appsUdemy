import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron title={"Search Fermin"} description="Fermin Fabella Medina" />
      <HeroStats />
    </>
  )
}
export default SearchPage;