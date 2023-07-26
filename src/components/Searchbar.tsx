import { IoSearchCircle } from 'react-icons/io5';
import { useState } from 'react';
import '../sass/main.scss';


function SearchBar() {
    const [modalState, setModalState] = useState({
        destinationModalIsOpen: false,
        calendarModalIsOpen: false,
        counterHippieModalIsOpen: false,
    });
    
    type ModalType = keyof typeof modalState;

    function openModal(modalType: ModalType) {
        setModalState((prevState) => ({
            ...prevState,
            [modalType]: true,
        }));
    }
    
    function closeModal(modalType: ModalType) {
        setModalState((prevState) => ({
            ...prevState,
            [modalType]: false,
        }));
    }
    
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    return(
        <div className='searchBar'>
            <div className='search_inputs'>
                <label className='search_input active' onClick={() => openModal('destinationModalIsOpen')}>
                    <span>Where</span>
                    <input type='text' placeholder='Add destination'/>
                </label>

                <label className='search_input' onClick={() => openModal('calendarModalIsOpen')}>
                    <div>Date</div>
                    <div>Choose a date</div>
                </label>

                <button className='search_input' onClick={() => openModal('counterHippieModalIsOpen')}>
                    <span>Who</span>
                    <span>Add people</span>
                </button>

                <button>
                    <IoSearchCircle size={50} color='#781816'/>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;