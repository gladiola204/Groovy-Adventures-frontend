import { useEffect, useState } from "react";
import useRedirectLoggedOutUser from "../../hooks/useRedirectLoggedOutUser";
import useAppDispatch from "../../hooks/useAppDispatch";
import { selectAuthState } from "../../redux/features/auth/authSlice";
import useAppSelector from "../../hooks/useAppSelector";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingCircle from "../../components/LoadingSpinner";

const Profile: React.FC = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useAppDispatch();
    const { isLoading, isSuccess, errorMessage} = useAppSelector(selectAuthState);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        if(!isLoading && isSuccess) {
            setCurrentPassword('');
            setNewPassword('');
        };
    }, [isLoading, isSuccess, dispatch]);
        
    return(
        <div>
            <ul>
                <li>
                    <Link to='/profile/wishlist'>Wishlist</Link>
                </li>
                <li>
                    <Link to='/profile/orders'>Orders</Link>
                </li>
                <li>
                    <button>Change Password</button>
                </li>
            </ul>
        </div>
    )
};

export default Profile