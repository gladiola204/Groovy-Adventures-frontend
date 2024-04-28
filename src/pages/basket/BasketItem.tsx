import CounterContainer from "../../components/Counter-container";
import useAppDispatch from "../../hooks/useAppDispatch";
import { REMOVE_FROM_BASKET, UPDATE_BASKET } from "../../redux/features/tour/tourSlice";
import { ITourInBasket } from "../../redux/features/tour/tourSlice.interface";
import { formatDateRange } from "../../utils/format-date";
import { GrFormClose as CloseIcon } from 'react-icons/gr';

interface Props {
    tourInBasket: ITourInBasket,
};

const BasketItem: React.FC<Props> = ({
    tourInBasket,
}) => {
    const dispatch = useAppDispatch();
    const { id, thumbnail, numberOfTravellers, schedule, title } = tourInBasket;

    const removeFromBasket = (id: string) => dispatch(REMOVE_FROM_BASKET(id));

    const handleChangeNumberOfTravellers = (value: 1 | -1) => {
        if(numberOfTravellers + value < 1) {
            removeFromBasket(id);
        };

        dispatch(UPDATE_BASKET({numberOfTravellers: numberOfTravellers + value, id}));
    }

    const dateRange = formatDateRange(new Date(schedule.startDate), new Date(schedule.endDate))

    return (
        <li key={id}>
            <img src={thumbnail}/>
            {title}
            {dateRange}

            <CounterContainer numberOfTravellers={numberOfTravellers} countTravellers={handleChangeNumberOfTravellers}/>

            <button onClick={() => removeFromBasket(id)}>
                <CloseIcon />
            </button>

            <h3>${schedule.price * numberOfTravellers}</h3>
        </li>
    );
};

export default BasketItem;