import { useEffect, useState } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { selectAuthState } from "../../../redux/features/auth/authSlice";
import useAppSelector from "../../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import validateFormData from "../../admin/helpers/validateFormData";
import registerValidationSchema from "./registerValidationSchema";
import useFormFieldErrors from "../../../hooks/useFormFieldErrors";
import authThunks from "../../../redux/features/auth/authThunks";
import useGlobalIsLoading from "../../../hooks/useGlobalIsLoading";

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const { setError } = useFormFieldErrors();

    const dispatch = useAppDispatch();
    const { isSuccess } = useAppSelector(selectAuthState);
    const isLoading = useGlobalIsLoading();
    const navigate = useNavigate();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = {email, login, password};

        const validated = await validateFormData(registerValidationSchema, formData, setError)

        if(!validated) return;

        dispatch(authThunks.registerUser(formData));
    }

    useEffect(() => {
        if(isSuccess && !isLoading) {
            navigate('/search')
        }
    }, [isSuccess, isLoading])

    return (
        <form onSubmit={handleSubmit}>
            Create an account:
            <label>
                Email
                <input type='email' value={email} onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                Login
                <input type='text' value={login} onChange={e => setLogin(e.target.value)}/>
            </label>
            <label>
                Password
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </label>

            <button type='submit'>Register</button>
        </form>
    )
};

export default Register;