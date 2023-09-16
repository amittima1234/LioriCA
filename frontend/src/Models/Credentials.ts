import { RegisterOptions } from 'react-hook-form';

class Credentials {
    public email: string;
    public password: string;

    public static emailValidation: RegisterOptions<Credentials, 'email'> = {
        required: { value: true, message: 'שדה חובה' },
        validate: {
            matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                'כתובת מייל לא תקינה',
        },
    };

    public static passwordValidation: RegisterOptions<Credentials, 'password'> =
        {
            required: { value: true, message: 'שדה חובה' },
        };
}

export default Credentials;
