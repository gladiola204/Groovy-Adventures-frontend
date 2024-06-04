import { useState } from "react";
import useRedirectLoggedOutUser from "../../hooks/useRedirectLoggedOutUser";
import { Link } from "react-router-dom";
import ChangePassword from "./ChangePassword";

const Profile: React.FC = () => {
    useRedirectLoggedOutUser('/login');
    const [isChangePasswordFormOpened, setIsChangePasswordFormOpened] = useState(false);
        
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
                    <button onClick={e => setIsChangePasswordFormOpened(true)}>Change Password</button>

                    {isChangePasswordFormOpened ?
                        <ChangePassword />
                        : null
                    }
                </li>
            </ul>
        </div>
    )
};

export default Profile