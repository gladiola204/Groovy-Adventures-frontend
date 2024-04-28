import { IoMdAddCircleOutline as PlusIcon } from 'react-icons/io';
import { AiOutlineMinusCircle as MinusIcon } from 'react-icons/ai';

interface Props {
    numberOfTravellers: number,
    countTravellers: (value: -1 | 1) => void,
    disableMinusButton?: boolean
}

const CounterContainer: React.FC<Props> = ({numberOfTravellers, countTravellers, disableMinusButton = false}) => {

    const renderButton = (number: 1 | -1) => (
        <button 
        className="counter__button" 
        type='button' 
        onClick={() => countTravellers(number)} 
        disabled={
            disableMinusButton &&
            number === -1 &&
            numberOfTravellers === 1
        }>
            {number === -1 ? <MinusIcon size={40}/> : <PlusIcon size={40}/>}
        </button>
    );


    return (
        <div className='counter__container'>
            <p>Travellers:</p>
            <div className="counter__controls">
                {renderButton(-1)}

                <span>{numberOfTravellers}</span>

                {renderButton(1)}
            </div>
        </div>
)};

export default CounterContainer;