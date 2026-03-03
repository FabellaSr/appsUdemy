import { useState } from 'react'
import { GifList } from './gifs/components/GifList.tsx'
import { PreviousSearches } from './gifs/components/PreviousSearches.tsx'
import { mockGifs } from './mock-data/gif.mock.ts'
import { CustomHeader } from './shared/components/CustomHeader.tsx'
import { SearchBar } from './shared/components/SearchBar.tsx'



export const GifsApp = () => {
    const [previousSearches, setPreviusSearchs] = useState(['fermin']);

    const halndleTermClicked = (term: string) => {
        console.log([term]);
    }

    const handleSearch = (query: string = '') => {
        //1. Validar que el query no este vacio
        query = query.trim().toLowerCase();
        if (query.length === 0) return;
        //2. Agregar el query a las busquedas previas
        if (previousSearches.includes(query)) return;

        // const currentSearches = previousSearches.slice(0, 6);
        setPreviusSearchs([query, ...previousSearches].splice(0, 7));
       // console.log({ query });
    };
    return (
        <>
            <CustomHeader title='Titulos' description='descripcion' />

            <SearchBar
                placeholder='Buscar'
                onQuery={handleSearch}
            />

       <PreviousSearches
        searches={previousSearches}
        onLabelClicked={halndleTermClicked}
      />
            <GifList gifs={mockGifs} />
        </>
    )
}
