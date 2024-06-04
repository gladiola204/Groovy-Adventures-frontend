
import { TbCompass as CompassIcon } from 'react-icons/tb';

interface Props {
    title: string,
    handleChangeDestination:() => void
}


const DestinationListItem: React.FC<Props> = ({ title, handleChangeDestination }) => {
   
    return(
        <button className='search-list__link' onClick={handleChangeDestination}>
            <CompassIcon className='search-list__icon'/>
            <h4 className='search-list__title'>
                { title }
            </h4>
        </button>
    )
};

export default DestinationListItem;
                // <span className='search-list__title--bold'>
                //     Amsterdam
                // </span>,
                // Holandia