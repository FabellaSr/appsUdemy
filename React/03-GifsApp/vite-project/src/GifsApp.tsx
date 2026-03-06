import { GifList } from './gifs/components/GifList.tsx'
import { PreviousSearches } from './gifs/components/PreviousSearches.tsx'
//import { mockGifs } from './mock-data/gif.mock.ts'
import { CustomHeader } from './shared/components/CustomHeader.tsx'
import { SearchBar } from './shared/components/SearchBar.tsx'
import { useGifs } from './gifs/hooks/useGifs.tsx'



export const GifsApp = () => {
    const { gifs, previousTerms, handleSearch, halndleTermClicked } = useGifs();
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
            <GifList gifs={gifs} />
        </>
    )
}
