import { RegisterOptions } from 'react-hook-form';

class User {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public role: string; // user or admin

    public static requiredValidation: RegisterOptions<User> = {
        required: { value: true, message: 'חסר שדה' },
    };
}

export default User;
