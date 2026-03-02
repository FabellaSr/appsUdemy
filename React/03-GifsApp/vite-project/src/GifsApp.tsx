import { useState } from 'react'
import { GifList } from './gifs/components/GifList.tsx'
import { PreviousSearches } from './gifs/components/PreviousSearches.tsx'
import { mockGifs } from './mock-data/gif.mock.ts'
import { CustomHeader } from './shared/components/CustomHeader.tsx'
import { SearchBar } from './shared/components/SearchBar.tsx'

const [previusSearchs, setpreviusSearchs] = useState('fermin');
 
const halndleTermClicked = (term: string) => {
    console.log([term]);
}

const handleSearch = (query:string) => {
    console.log({query});
};
export const GifsApp = () => {
    return (
        <>
            <CustomHeader title='Titulos' description='descripcion' />

            <SearchBar 
                descripcion='Buscar'
                onQuery={handleSearch}
            />

            <PreviousSearches title='Busquedas previas' list={['busqueda1','busqueda2']} onLabelClicked={halndleTermClicked}/>

            <GifList gifs={mockGifs}/>
        </>
    )
}
