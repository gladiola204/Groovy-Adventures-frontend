import CounterContainer from '../../Counter-container';
import DialogOrModal from '../../modals/shared/DialogOrModal';
import '../../sass/main.scss';

const CounterTravellersModal: React.FC = () => {

    return(
        <DialogOrModal classNameDialog='dialog--counter' isModalOpen={isModalOpen} closeModal={closeModal} contentLabel='Counter Travellers' classNameModal='ReactModal__Modal--counter-travellers' isNextButton={true}>
            <CounterContainer numberOfTravellers={numberOfTravellers} countTravellers={countTravellers}/>
        </DialogOrModal>
    )
}

export default CounterTravellersModal;