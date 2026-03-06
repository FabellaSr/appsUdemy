import { useRef, useState } from 'react'
import { getGifsByQuery } from '../actions/get-gifs-by-query.ts';
import type { Gif } from '../interfaces/gif.interface.ts';

//const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const gifsCache = useRef<Record<string, Gif[]>>({});

    const halndleTermClicked = async (term: string) => {
        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term]);
            return;
        }
        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
    }

    const handleSearch = async (query: string = '') => {
        //1. Validar que el query no este vacio
        query = query.trim().toLowerCase();
        if (query.length === 0) return;
        //2. Agregar el query a las busquedas previas
        if (previousTerms.includes(query)) return;

        // const currentSearches = previousSearches.slice(0, 6);
        setPreviousTerms([query, ...previousTerms].splice(0, 7));
 
        const gifs = await getGifsByQuery(query);
        setGifs(gifs); 

        gifsCache.current[query] = gifs;
        
    };
  return {
    gifs,
    previousTerms,
    handleSearch,
    halndleTermClicked
  }
}
