import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit } = useForm();

    const onFormSubmit = (user) => {
        console.log(user.name, user.password);
    };

    return (
        <div className='login'>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <h2>התחברות</h2>

                <div>
                    <label>שם משתמש</label>
                    <input type='text' {...register('name')}></input>
                </div>
                <div>
                    <label>סיסמה</label>
                    <input type='number' {...register('password')}></input>
                </div>
                <button>התחבר</button>
            </form>
        </div>
    );
};

export default Login;
