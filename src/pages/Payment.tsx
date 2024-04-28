import useApiRequest from "../hooks/useApiRequest";
import paymentService from "../services/paymentService";
import StripeCheckout, { Token } from 'react-stripe-checkout';
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { IOrder } from "../redux/features/order/orderSlice.interface";
import { selectOrderState } from "../redux/features/order/orderSlice";
import useRedirectLoggedOutUser from "../hooks/useRedirectLoggedOutUser";
import { selectAuthState } from "../redux/features/auth/authSlice";
import { selectTourState } from "../redux/features/tour/tourSlice";

interface ICreateNewPayment {
    token: string,
    orderId: string,
}

export function isIOrder(object: any): object is IOrder {
    return 'id' in object;
}

const Payment: React.FC = () => {
    useRedirectLoggedOutUser('/login');
    const { isLoading, error, sendRequest } = useApiRequest<undefined, ICreateNewPayment>();
    const dispatch = useAppDispatch();
    const { order } = useAppSelector(selectOrderState);
    const { user } = useAppSelector(selectAuthState);
    const { basket } = useAppSelector(selectTourState);

    // useEffect(() => {
    //     if(basket.length === 0) {
    //         return;
    //     }
    //     const orderData = basket.map(tourInBasket => ({
    //         scheduleId: tourInBasket.scheduleId, 
    //         numberOfParticipants: tourInBasket.numberOfTravellers
    //     }));

    //     dispatch(createOrder({orderData}))
    // }, [dispatch, basket]);

    return(
        <>
            {isIOrder(order) && 
                <StripeCheckout
                    token={(token) => sendRequest(paymentService.createNewPayment, { body: { token: token.id, orderId: order.id } })}
                    stripeKey="pk_test_51O2saiJxvWfFDsXX2TRNjbWFJ1HuoP92L5uO1p4y4RNi6d0I2g36ptdmAlLmBTIwBc5dU5DcIWur4GMqwKFBwOej00mZys9YtZ" // można to dać np. do secretu w kubernetes
                    amount={order.price * 100}
                    email={user.email}
                />
            }
        </>
    )
};

export default Payment
