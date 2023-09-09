import { RegisterOptions } from 'react-hook-form';
import User from './User';

class Credentials {
    public email: string;
    public password: string;

    public static requiredValidation: RegisterOptions<Credentials> = {
        required: { value: true, message: 'חסר שדה' },
    };
}

export default Credentials;
