import '../../../../sass/main.scss';
import DialogOrModal from '../../../modals/shared/DialogOrModal';
import useDestinationState from '../../hooks/useDestinationState';
import useModalState, { ModalType } from '../../../../hooks/useModalState';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import tourThunks from '../../../../redux/features/tour/tourThunks';
import { useState } from 'react';
import { IDestinationDoc } from '../../../../redux/features/tour/tourSlice.interface';
import DestinationListItem from './DestinationListItem';

type InfoType = {
    name: string;
    place_id: string;
  };
  
type InputTextType = string;

type DestinationState = {
info: InfoType;
inputText: InputTextType;
};

type Field = 'info' | 'inputText';
type FieldValue<T extends Field> = T extends 'info' ? InfoType : InputTextType;

const DestinationModal: React.FC = () => {
    //const { destination, handleChangeDestination } = useDestinationState();
    const [destination, setDestination] = useState<DestinationState>({
        inputText: '',
        info: {
            name: '',
            place_id: '',
        }
    });
    const [foundDestinations, setFoundDestinations] = useState<IDestinationDoc[]>([])
    const { openedModal, handleCloseModal, handleOpenModal } = useModalState();

    const handleChangeDestination = <T extends Field>(field: T, newData: FieldValue<T>) => setDestination(prevState => ({
        ...prevState,
        [field]: newData
    }));

    const dispatch = useAppDispatch();

    const handleChangeInput = async(e: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeDestination('inputText', e.target.value);

        const resultAction = await dispatch(tourThunks.getDestinations(e.target.value));

        if (tourThunks.getDestinations.fulfilled.match(resultAction)) {
            setFoundDestinations(resultAction.payload.data);
        } else if (tourThunks.getDestinations.rejected.match(resultAction)) {
            console.error('Failed to fetch destinations:', resultAction.payload);
        }
    }


    const renderDestinationListItems = foundDestinations.map(dest => 
        <li key={dest.place_id} className='search-list__item'>
            <DestinationListItem 
                title={dest.name}
                handleChangeDestination={() => {
                    handleChangeDestination('info', { name: dest.name, place_id: dest.place_id })
                    handleChangeDestination('inputText', dest.name)
                }}
            />
        </li> 
    )

    return(
        <DialogOrModal 
            classNameDialog='dialog--destination' 
            classNameModal='' 
            isModalOpen={openedModal === ModalType.Destination} 
            closeModal={handleCloseModal} 
            contentLabel='Destination' 
            isNextButton={true}>
                
            <label className='modal-destination__label'>
                <h3 className='modal-destination__header'>Search for destination</h3>
                <input className="modal-destination__input" type='text' placeholder='e.g. city, continent, country' value={destination.inputText} onChange={handleChangeInput}/>
            </label>

            <ul className='search-list' >
                {renderDestinationListItems}
            </ul>
        </DialogOrModal>
    )
}

export default DestinationModal;