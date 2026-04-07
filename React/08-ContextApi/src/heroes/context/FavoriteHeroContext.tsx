import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";
import { useHeroFavorites } from "../hooks/useHeroFavorites";

interface FavoriteHeroContextType {
    //state
    favorites: Hero[];
    favoriteCount: number;
    //Methods
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;
}

export const FavoriteHeroContext = createContext({} as FavoriteHeroContextType);

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(useHeroFavorites);

    const toggleFavorite = (hero: Hero) => {
        const heroExist = favorites.find((h) => h.id === hero.id);
        if (heroExist) {
            setFavorites(favorites => favorites.filter(fav => fav.id !== hero.id));
            return;
        }

        setFavorites(favorites => [...favorites, hero]);
    }

    const isFavorite = (hero: Hero) => {
        return favorites.some((h) => h.id === hero.id);
    }

    useEffect(() => {
        localStorage.setItem('favoriteHeroes', JSON.stringify(favorites));
    }, [favorites]);

    const favoriteCount = favorites.length;
    return (
        <FavoriteHeroContext
            value={{
                favorites,
                favoriteCount,

                isFavorite,
                toggleFavorite
            }}
        >
            {children}


        </FavoriteHeroContext>
    )
}
