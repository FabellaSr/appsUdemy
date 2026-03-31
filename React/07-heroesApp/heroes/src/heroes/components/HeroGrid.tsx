// import { HeroGirdCard } from './HeroGirdCard'


// export const HeroGrid = () => {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
//             {/* Hero Card 1 - Superman */}
//             <HeroGirdCard
//                 title='Superman'
//                 name='Clar Kent'
//                 description='The Man of Steel from Krypton, protector of humanity with incredible powers.'
//                 strength={100}
//                 intelligence={80}
//                 speed={100}
//                 durability={100}
//                 powers={['Super Strength', 'Flight', 'Heat Vision']}
//                 universe='DC'
//                 team='Justice League'
//                 status='Active'
//                 type='Hero'
//                 footCard='First appeared: 1938'
//             />
 
//         </div>
//     )
// }
import type { Hero } from '../types/hero.interface';
import { HeroGridCard } from './HeroGirdCard';

interface Props {
  heroes: Hero[];
}

export const HeroGrid = ({ heroes }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      {heroes.map((hero) => (
        <HeroGridCard key={hero.id} hero={hero} />
      ))}
    </div>
  );
};