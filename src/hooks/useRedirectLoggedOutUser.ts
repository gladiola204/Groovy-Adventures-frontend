import { useEffect } from "react";
import authService from "../services/authService";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "./useAppDispatch";

function useRedirectLoggedOutUser(path: string) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        async function redirectLoggedOutUser() {
            const status = await authService.getUserStatus();
            
            if(status !== 401) {
                dispatch(SET_LOGIN(true));
                return;
            };

            dispatch(SET_LOGIN(false));
            toast.info('Session expired, please login to continue');
            navigate(path);
        };
        redirectLoggedOutUser();
    }, [navigate, path, dispatch]);

}

export default useRedirectLoggedOutUser;