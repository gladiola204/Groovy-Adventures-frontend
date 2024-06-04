import { IoSearchCircle as SearchIcon } from 'react-icons/io5';
import { useCallback } from 'react';
import '../../sass/main.scss';
import useModalState, { ModalType } from '../../hooks/useModalState';
import clsx from 'clsx';
import DestinationInput from './components/destination/DestinationInput';
import CalendarInput from './components/CalendarInput';
import CounterTravellersInput from './components/CounterTravellersInput';
import useAppDispatch from '../../hooks/useAppDispatch';
import tourThunks from '../../redux/features/tour/tourThunks';

function SearchBar() {
    const { openedModal } = useModalState();
    const dispatch = useAppDispatch();

    const getButtonClass = useCallback((modalName: ModalType.Calendar | ModalType.Destination | ModalType.Counter) => {
        return clsx(
          'searchBar__button',
          `searchBar__button--${modalName}`,
          {
            'searchBar__button--active': openedModal === modalName,
          }
        );
    }, [openedModal]);

    // interface IQuery {
    //     category?: string,
    //     price?: string,
    //     people?: string,
    //     startDate?: string,
    //     endDate?: string,
    //     page: number,
    //     limit: number,
    // };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        // dispatch(tourThunks.filterTours({
            
        // }))
    }

    return(
        <form className='searchBar' onSubmit={handleSearch}>

            <DestinationInput getButtonClass={getButtonClass}/>
            <CalendarInput getButtonClass={getButtonClass}/>
            <CounterTravellersInput getButtonClass={getButtonClass}/>
           
            <button className='searchBar__submit-button' type='submit'>
                <SearchIcon className='searchBar__search-icon'/>
                Search
            </button>        
        </form>
    );
};

export default SearchBar;
