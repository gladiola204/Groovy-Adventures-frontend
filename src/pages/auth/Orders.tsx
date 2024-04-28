import { useEffect } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import orderThunks from "../../redux/features/order/orderThunks";
import Order from "./Order";
import { selectOrderState } from "../../redux/features/order/orderSlice";
import LoadingCircle from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import useRedirectLoggedOutUser from "../../hooks/useRedirectLoggedOutUser";

const Orders: React.FC = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useAppDispatch();
    const { allOrders, isLoading, errorMessage }= useAppSelector(selectOrderState);

    useEffect(() => {
        dispatch(orderThunks.getAllOrders());
    }, [dispatch]);

    const renderOrders = allOrders.map(order => (
        <li key={order.id}>
            <Order forwardedOrder={order}/>
        </li>
    ))

    return (
        <div>

            <ul>
                {renderOrders} 
            </ul>
        </div>
    )
};

export default Orders;