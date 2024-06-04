import { useEffect, useState } from "react";
import { selectAuthState } from "../../redux/features/auth/authSlice";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import ErrorMessage from "../../components/ErrorMessage";
import * as Yup from 'yup';
import validateFormData from "../admin/helpers/validateFormData";
import useFormFieldErrors from "../../hooks/useFormFieldErrors";
import SuccessMessage from "../../components/SuccessMessage";
import authThunks from "../../redux/features/auth/authThunks";
import useGlobalIsLoading from "../../hooks/useGlobalIsLoading";

const changePasswordValidation = Yup.object().shape({
    oldPassword: Yup.string().trim().min(4).max(20).required(),
    newPassword: Yup.string().trim().min(4).max(20).required(),
})

const ChangePassword: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isSuccess, errorMessage } = useAppSelector(selectAuthState);
    const isLoading = useGlobalIsLoading();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const { setError, generateFormErrorMessage } = useFormFieldErrors();

    const handleChangePassword = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            oldPassword: currentPassword, 
            newPassword
        };

        const validatedData = await validateFormData(changePasswordValidation, formData, setError)

        if(!validatedData) return;

        dispatch(authThunks.changePassword(formData));
    };

    useEffect(() => {
        if(isSuccess) {
            setCurrentPassword('');
            setNewPassword('');
        };
    }, [isSuccess]);

    return(
        <form onSubmit={(e) => handleChangePassword(e)}>
            <label>
                Current Password
                <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
                {generateFormErrorMessage('oldPassword')}
            </label>
            <label>
                New Password
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                {generateFormErrorMessage('newPassword')}
            </label>

            <button type="submit">Change Password</button>
        </form>
    )
};

export default ChangePassword;