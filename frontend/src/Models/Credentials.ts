import { RegisterOptions } from 'react-hook-form';

class Credentials {
    public email: string;
    public password: string;

    public static requiredValidation: RegisterOptions<Credentials> = {
        required: { value: true, message: 'שדה חובה' },
    };
}

export default Credentials;
