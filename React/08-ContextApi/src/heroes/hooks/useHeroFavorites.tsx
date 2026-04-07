import type { Hero } from "../types/hero.interface";

export const useHeroFavorites = (): Hero[] => {
    const favorites = localStorage.getItem('favoriteHeroes');
    return favorites ? JSON.parse(favorites) : [];
}
