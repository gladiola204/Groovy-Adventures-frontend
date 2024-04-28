import { useMemo} from "react";
import useAppSelector from "../../hooks/useAppSelector"
import { selectTourState } from "../../redux/features/tour/tourSlice";
import { useNavigate } from "react-router-dom";
import { ITourInBasket } from "../../redux/features/tour/tourSlice.interface";
import BasketItem from "./BasketItem";

const Basket: React.FC = () => {
    const { basket } = useAppSelector(selectTourState);

    const navigate = useNavigate();

    const handleRedirect = () => {
        // Przekierowanie na inny URL
        navigate("/payment");
    };
    
    const totalPrice = useMemo(() => {
        if(basket.length === 0) return 0;

        return basket.reduce((acc: number, { schedule, numberOfTravellers }: ITourInBasket) => {
            return acc + schedule.price * numberOfTravellers;
        }, 0 as number);
    }, [basket]);

    const renderBasketList = useMemo(() => 
        basket.map(tourInBasket => <BasketItem tourInBasket={tourInBasket} />
    ), [basket]);

    return(
        <div>
            <ul>
                {renderBasketList}
            </ul>
            <h1>Total price: {totalPrice}</h1>
            <button onClick={handleRedirect}>Reserve</button>
        </div>
        
    )
};

export default Basket;