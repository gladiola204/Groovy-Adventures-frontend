import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SET_ADMIN, SET_LOGIN } from "../redux/features/auth/authSlice";
import useAppDispatch from "./useAppDispatch";
import adminService from "../services/adminService";

function useAdminAccessGuard(path: string) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        async function adminAccessGuard() {
            const { data } = await adminService.getAdminStatus();
            
            if(data !== 401) {
                dispatch(SET_LOGIN(true));
                dispatch(SET_ADMIN(true))
                return;
            };

            dispatch(SET_LOGIN(false));
            dispatch(SET_ADMIN(false));

            toast.info('You need to have admin access'); //POPRAWIĆ
            navigate(path);
        };
        adminAccessGuard();
    }, [navigate, path, dispatch]);

}

export default useAdminAccessGuard;