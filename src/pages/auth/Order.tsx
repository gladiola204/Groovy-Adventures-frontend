import { useEffect, useState } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { selectOrderState } from "../../redux/features/order/orderSlice";
import { useParams } from "react-router-dom";
import { isIOrder } from "../Payment";
import orderThunks from "../../redux/features/order/orderThunks";
import { IOrder } from "../../redux/features/order/orderSlice.interface";
import LoadingCircle from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import useRedirectLoggedOutUser from "../../hooks/useRedirectLoggedOutUser";
  
interface Props {
    forwardedOrder?: IOrder
}

const Order: React.FC<Props> = ({ forwardedOrder }) => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useAppDispatch();
    const { isLoading, order, isError, errorMessage} = useAppSelector(selectOrderState)
    const { orderId } = useParams();
    const [orderState, setOrderState] = useState<IOrder>();

    useEffect(() => {
        if (forwardedOrder) {
            setOrderState(forwardedOrder);
        } else if (isIOrder(order)) {
            setOrderState(order);
        } else if (orderId) {
            dispatch(orderThunks.getOrder(orderId));
        }
    }, [orderId, forwardedOrder, order, dispatch]);

    return(
        <div>
            {orderState &&
                <>
                    {orderState.id}
                    {orderState.status}
                    {orderState.price}
                    {orderState.schedule.map(({ doc, numberOfParticipants }) => (
                        <div key={doc.id}>
                            {doc.startDate.toString()}
                            {doc.endDate.toString()}
                            {numberOfParticipants}
                        </div>
                    ))}
                </>
            }
        </div>
    )
};

export default Order;