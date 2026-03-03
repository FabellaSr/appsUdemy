import { useState } from 'react'
import { GifList } from './gifs/components/GifList.tsx'
import { PreviousSearches } from './gifs/components/PreviousSearches.tsx'
import { mockGifs } from './mock-data/gif.mock.ts'
import { CustomHeader } from './shared/components/CustomHeader.tsx'
import { SearchBar } from './shared/components/SearchBar.tsx'

import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.ts';
import type { Gif } from './gifs/interfaces/gif.interface';


export const GifsApp = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const halndleTermClicked = (term: string) => {
        console.log([term]);
    }

    const handleSearch = async (query: string = '') => {
        //1. Validar que el query no este vacio
        query = query.trim().toLowerCase();
        if (query.length === 0) return;
        //2. Agregar el query a las busquedas previas
        if (previousTerms.includes(query)) return;

        // const currentSearches = previousSearches.slice(0, 6);
        setPreviousTerms([query, ...previousTerms].splice(0, 7));
        // console.log({ query });
        const gifs = await getGifsByQuery(query);
        setGifs(gifs);
        
    };
    
    return (
        <>
            <CustomHeader title='Titulos' description='descripcion' />

            <SearchBar
                placeholder='Buscar'
                onQuery={handleSearch}
            />

            <PreviousSearches
                searches={previousTerms}
                onLabelClicked={halndleTermClicked}
            />
            <GifList gifs={mockGifs} />
        </>
    )
}
