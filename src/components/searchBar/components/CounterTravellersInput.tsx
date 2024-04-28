import useModalState, { ModalType } from "../../../hooks/useModalState";


const CounterTravellersInput: React.FC = () => {
    const { handleOpenModal } = useModalState();
    const { Counter } = ModalType;

    return(
        <label>
            <button className={getButtonClass('counter')} onClick={() => handleOpenModal('counter')} type='button'>
                <div className='searchBar__label'>Who</div>
                <div className='searchBar__input'>{numberOfTravellers} people</div>
            </button>
        </label>
    )
};

export default CounterTravellersInput;