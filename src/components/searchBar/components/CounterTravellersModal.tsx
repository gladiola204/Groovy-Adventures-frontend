import useModalState, { ModalType } from '../../../hooks/useModalState';
import CounterContainer from '../../Counter-container';
import DialogOrModal from '../../modals/shared/DialogOrModal';
import '../../../sass/main.scss';
import useCounterTravellersState from '../hooks/useCounterTravellersState';

const CounterTravellersModal: React.FC = () => {
    const { openedModal, handleCloseModal } = useModalState();
    const { numberOfTravellers, countTravellers } = useCounterTravellersState();
    const { Counter } = ModalType;
    
    return(
        <DialogOrModal classNameDialog='dialog--counter' isModalOpen={openedModal === Counter} closeModal={handleCloseModal} contentLabel='Counter Travellers' classNameModal='ReactModal__Modal--counter-travellers' isNextButton={true}>
            <CounterContainer numberOfTravellers={numberOfTravellers} countTravellers={countTravellers}/>
        </DialogOrModal>
    )
}

export default CounterTravellersModal;