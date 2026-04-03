import { useParams } from "react-router"

 
export const HeroPage = () => {
  const { idSlug = ''} = useParams();
  const params = useParams();
  console.log({params});
  console.log({idSlug});
  return (
    <div>HeroPage</div>
  )
}
