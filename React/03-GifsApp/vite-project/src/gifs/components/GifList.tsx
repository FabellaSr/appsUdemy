import type { FC } from 'react'
import type { Gif } from '../../mock-data/gif.mock'

interface Props {
    gifs: Gif[];
}
export const GifList: FC<Props> = ({ gifs }) => {
    return (
        <div className='gifs-conteiner'>
            {gifs.map((gif) => (
                <div key={gif.id} className='gif-card'>
                    <img src={gif.url} alt={gif.title} />
                    <p>
                        {gif.width}x{gif.height}(1.5mb)
                    </p>
                </div>
            ))}

        </div>
    )
}
