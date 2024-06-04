import ReactModal from "./shared/ReactModal";
import '../../sass/main.scss';
import { ChangeEvent, FormEvent, useState } from "react";
import clsx from 'clsx';
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import authThunks from "../../redux/features/auth/authThunks";

interface Props {
    isModalOpen: boolean,
    closeModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void,
}

type ActiveLabel = 'login' | 'signup' | null;

const LoginModal: React.FC<Props> = ({ isModalOpen, closeModal }) => {
    const [loginData, setLoginData] = useState({
        email: '',
        login: '',
        password: '',
    })
    const [activeLabel, setActiveLabel] = useState<ActiveLabel>('signup');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({
          ...prevState,
          [name]: value,
        }));
    };
    const headerClass = (type: 'signup' | 'login') => clsx('login-box__header', {
        'login-box__header--active': activeLabel === type,
        'login-box__header--login': type === 'login'
    });

    const login = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await dispatch(authThunks.loginUser(loginData));
        navigate('/search');
    };

    const register = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await dispatch(authThunks.registerUser(loginData));
        navigate('/search');
    };

    return(
        <ReactModal isModalOpen={isModalOpen} closeModal={closeModal} contentLabel="Login" classNameModal="ReactModal__Modal--login">
            <div className='login-box'>
                <button className={headerClass('signup')} type='button' onClick={() => setActiveLabel('signup')}>Sign up</button>
                <form className="login-box__form" onSubmit={register}>
                    <label className="login-box__label">
                        <input placeholder="email@domain.com" type="email" name='email' value={loginData.email} onChange={handleChange} className="login-box__input"/>
                    </label>

                    <label className="login-box__label">
                        <input placeholder="login" type="text" name='login' value={loginData.login} onChange={handleChange} className="login-box__input"/>
                    </label>

                    <label className="login-box__label">
                        <input type="password" placeholder="********" name='password' value={loginData.password} onChange={handleChange} className="login-box__input"/>
                    </label>

                    <button type="submit" className="btn-pill login-box__submit-button">Sign up</button>
                </form>
            </div>
            
            <div className={clsx('login-box', 'login-box--login', {
                'login-box--active': activeLabel === 'login'
            })}>
                <button className={headerClass('login')} onClick={() => setActiveLabel('login')}>Login</button>
                <form className="login-box__form" onSubmit={login}>
                    <label className="login-box__label login-box__label--dark">
                        <input placeholder="email@domain.com" type="email" name='email' value={loginData.email} onChange={handleChange} className="login-box__input login-box__input--white-plchd"/>
                    </label>

                    <label className="login-box__label login-box__label--dark">
                        <input type="password" placeholder="********" name="password" value={loginData.password} onChange={handleChange} className="login-box__input login-box__input--white-plchd"/>
                    </label>

                    <button type="submit" className="btn-pill btn-pill--white login-box__submit-button">Login</button>

                    <button className="login-box__forgotten-password">I forgot my password</button>
                </form>
            </div>
        </ReactModal>
    )
}

export default LoginModal;