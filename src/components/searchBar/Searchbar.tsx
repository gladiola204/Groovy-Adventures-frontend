import { IoSearchCircle as SearchIcon } from 'react-icons/io5';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../sass/main.scss';
import DestinationModal from './components/DestinationModal';
import CalendarModal from '../modals/CalendarModal';
import CounterTravellersModal from './components/CounterTravellersModal';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { format } from 'date-fns';
import { Desktop, TabletAndBelow } from '../../utils/mediaQueries';
import useModalState, { ModalType } from '../../hooks/useModalState';
import clsx from 'clsx';
import useCounterTravellersState from '../../hooks/useCounterTravellersState';

function SearchBar() {
    const { openedModal, handleCloseModal, handleOpenModal } = useModalState();
    const { numberOfTravellers, countTravellers } = useCounterTravellersState();

    const getButtonClass = useCallback((modalName: ModalType.Calendar | ModalType.Destination | ModalType.Counter) => {
        return clsx(
          'searchBar__button',
          `searchBar__button--${modalName}`,
          {
            'searchBar__button--active': openedModal === modalName,
          }
        );
    }, [openedModal]);

    return(
        <form className='searchBar'>
           
            <button className='searchBar__submit-button' type='submit'>
                <SearchIcon className='searchBar__search-icon'/>
                Search
            </button>


            <CounterTravellersModal numberOfTravellers={numberOfTravellers} countTravellers={countTravellers} isModalOpen={openedModal === 'counter'} closeModal={handleCloseModal}/>

            
        </form>
    );
};

export default SearchBar;
