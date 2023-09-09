import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../../Services/AuthService';
import './Register.css';
import User from '../../Models/User';

function Register(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>();
    const navigate = useNavigate();

    const onFormSubmit = async (user: User) => {
        try {
            // await authService.register(user);
            navigate('/home');
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <div className="Register">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div>
                    <label>שם משתמש</label>
                    <input
                        type="text"
                        {...register('name', User.requiredValidation)}
                    ></input>
                    <span className="Error">{errors?.name?.message}</span>
                </div>
                <div>
                    <label>תעודת זהות</label>
                    <input
                        type="number"
                        {...register('id', User.requiredValidation)}
                    ></input>
                    <span className="Error">{errors?.email?.message}</span>
                </div>
                <div>
                    <label>מייל</label>
                    <input
                        type="email"
                        {...register('email', User.requiredValidation)}
                    ></input>
                    <span className="Error">{errors?.email?.message}</span>
                </div>
                <div>
                    <label>סיסמה</label>
                    <input
                        type="password"
                        {...register('password', User.requiredValidation)}
                    ></input>
                    <span className="Error">{errors?.password?.message}</span>
                </div>
                <button>הרשמה</button>
            </form>
        </div>
    );
}

export default Register;
