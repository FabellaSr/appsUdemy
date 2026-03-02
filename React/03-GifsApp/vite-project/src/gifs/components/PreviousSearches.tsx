interface Props {
    title: string;
    list: string[];
    onLabelClicked: (term:string) => void;
}

export const PreviousSearches = ({ title, list ,onLabelClicked}: Props) => {
    return (
        <div className='previous-searches'>
            <h2>{title}</h2>
            <ul className='previous-searches-list'>
                {list.map((e) => (
                    <li key={e} onClick={ () => onLabelClicked(e) }>
                        
                        {e}
                    </li>
                ))}
            </ul>

        </div>
    )
}