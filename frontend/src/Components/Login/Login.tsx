import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import Credentials from '../../Models/Credentials';
import authService from '../../Services/AuthService';
import './Login.css';

function Login(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Credentials>();
    const navigate = useNavigate();

    const onFormSubmit = async (credentials: Credentials) => {
        try {
            await authService.login(credentials);
            navigate('/home');
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <div className="Login">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div>
                    <label>מייל</label>
                    <input
                        {...register('email', Credentials.emailValidation)}
                    ></input>
                    <small className="Error">
                        {errors?.email?.message || ''}
                    </small>
                </div>
                <div>
                    <label>סיסמה</label>
                    <input
                        type="password"
                        {...register(
                            'password',
                            Credentials.passwordValidation
                        )}
                    ></input>
                    <small className="Error">
                        {errors?.password?.message || ''}
                    </small>
                </div>
                <button>התחברות</button>
            </form>
            <small className="ToRegisterBtn">
                עוד לא נרשמת?
                <NavLink to="/register">להרשמה </NavLink>
            </small>
        </div>
    );
}

export default Login;
