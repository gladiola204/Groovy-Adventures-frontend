import useModalState, { ModalType } from "../../../hooks/useModalState";
import useCounterTravellersState from "../hooks/useCounterTravellersState";
import CounterTravellersModal from "./CounterTravellersModal";

interface Props {
    getButtonClass: (modalName: ModalType.Counter) => string
}

const CounterTravellersInput: React.FC<Props> = ({ getButtonClass }) => {
    const { handleOpenModal } = useModalState();
    const { Counter } = ModalType;
    const { numberOfTravellers } = useCounterTravellersState();

    return(
        <label>
            <button className={getButtonClass(Counter)} onClick={() => handleOpenModal(Counter)} type='button'>
                <div className='searchBar__label'>Who</div>
                <div className='searchBar__input'>{numberOfTravellers} people</div>
            </button>

            <CounterTravellersModal />
        </label>
    )
};

export default CounterTravellersInput;