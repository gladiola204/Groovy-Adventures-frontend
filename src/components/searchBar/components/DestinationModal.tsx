import { TbCompass } from 'react-icons/tb';
import '../../sass/main.scss';
import { Link } from 'react-router-dom';
import { ChangeEvent } from 'react';
import DialogOrModal from '../../modals/shared/DialogOrModal';
import useDestinationState from '../hooks/useDestinationState';
import useModalState from '../../../hooks/useModalState';


const DestinationModal: React.FC = () => {
    const { destination, handleChangeDestination } = useDestinationState();
    const { openedModal, handleCloseModal, handleOpenModal } = useModalState();

    return(
        <DialogOrModal classNameDialog='dialog--destination' classNameModal='' isModalOpen={isModalOpen} closeModal={closeModal} contentLabel='Destination' isNextButton={true}>
            <label className='modal-destination__label'>
                <h3 className='modal-destination__header'>Search for destination</h3>
                <input className="modal-destination__input" type='text' placeholder='e.g. city, continent, country' value={destination} onChange={handleChangeDestination}/>
            </label>

            <ul className='search-list' onClick={(e) => {setDestination('Amsterdam'); closeModal(e)}}>
                <li className='search-list__item'>
                    <Link to='/' className='search-list__link'>
                        <TbCompass className='search-list__icon'/>
                        <h4 className='search-list__title'>
                            <span className='search-list__title--bold'>
                                Amsterdam
                            </span>,
                            Holandia
                        </h4>
                    </Link>
                </li>
                <li className='search-list__item'>
                    <Link to='/' className='search-list__link'>
                        <TbCompass className='search-list__icon'/>
                        <h4 className='search-list__title'>
                            <span className='search-list__title--bold'>
                                Amsterdam
                            </span>,
                            Holandia
                        </h4>
                    </Link>
                </li>
                <li className='search-list__item'>
                    <Link to='/' className='search-list__link'>
                        <TbCompass className='search-list__icon'/>
                        <h4 className='search-list__title'>
                            <span className='search-list__title--bold'>
                                Amsterdam
                            </span>,
                            Holandia
                        </h4>
                    </Link>
                </li>
                <li className='search-list__item'>
                    <Link to='/' className='search-list__link'>
                        <TbCompass className='search-list__icon'/>
                        <h4 className='search-list__title'>
                            <span className='search-list__title--bold'>
                                Amsterdam
                            </span>,
                            Holandia
                        </h4>
                    </Link>
                </li>
            </ul>
        </DialogOrModal>
    )
}

export default DestinationModal;