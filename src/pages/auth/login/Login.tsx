import { useEffect, useState } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { selectAuthState } from "../../../redux/features/auth/authSlice";
import useAppSelector from "../../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import useFormFieldErrors from "../../../hooks/useFormFieldErrors";
import validateFormData from "../../admin/helpers/validateFormData";
import loginValidationSchema from "./loginValidationSchema";
import authThunks from "../../../redux/features/auth/authThunks";
import useGlobalIsLoading from "../../../hooks/useGlobalIsLoading";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const { isSuccess } = useAppSelector(selectAuthState);
    const isLoading = useGlobalIsLoading();
    const navigate = useNavigate();
    const { setError } = useFormFieldErrors();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {email, password};

        const validated = await validateFormData(loginValidationSchema, formData, setError)

        if(!validated) return;

        dispatch(authThunks.loginUser({email, password}));
    }

    useEffect(() => {
        if(isSuccess && !isLoading) {
            navigate(-1);
        }
    }, [isSuccess, isLoading])

    return (
        <form onSubmit={handleSubmit}>
            Login:
            <label>
                Email
                <input type='email' value={email} onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                Password
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </label>

            <button type='submit'>Login</button>

            <a>Register</a>
        </form>
    )
};

export default Login;