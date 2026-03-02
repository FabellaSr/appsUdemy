import { heroes, type Hero, Owner } from "../data/heroes.data";
///import  thisHeroes  from "../data/heroes.data";

const getHeroById = (id: number): Hero | undefined => {
    const hero = heroes.find( (hero)=> {
        return hero.id === id;
    });
    if (!hero) throw new Error(`No existe  ${id}`);
    return hero;
}

/*export const getHeroeByOwner = (owner: Owner) =>{
    const herosByOwner = heroes.filter(hero => hero.owner === owner)
    return herosByOwner;
}*/ // Preferible este que esta comentado
export const getHeroeByOwner = (owner: Owner) => 
    heroes.filter(hero => hero.owner === owner);

console.log(getHeroById(1));