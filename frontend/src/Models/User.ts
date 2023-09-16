import { RegisterOptions } from 'react-hook-form';

class User {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public role: string; // user or admin

    public static emailValidation: RegisterOptions<User, 'email'> = {
        required: { value: true, message: 'שדה חובה' },
        validate: {
            matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                'כתובת מייל לא תקינה',
        },
    };

    public static requiredValidation: RegisterOptions<User, any > = {
        required: { value: true, message: 'שדה חובה' },
    };
}

export default User;
