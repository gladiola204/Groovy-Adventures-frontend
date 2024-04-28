import { useEffect } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { selectAuthState } from "../../redux/features/auth/authSlice";
import authThunks from "../../redux/features/auth/authThunks";


const Wishlist: React.FC = () => {
    const dispatch = useAppDispatch();
    const { wishlist } = useAppSelector(selectAuthState);

    useEffect(() => {
        dispatch(authThunks.getWishlist());
    }, []);

    const renderWishlist = wishlist.map(tour => (
        <li key={tour.id}>
            <button>remove from wishlist</button>
            <h3>{tour.title}</h3>
        </li>
    ))
    return (
        <ul>
            {renderWishlist}
        </ul>
    );
}

export default Wishlist;