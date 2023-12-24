import { RegisterOptions } from 'react-hook-form';

class Certificate {
    public uuid: string;
    public name: string;
    public expirationDate: Date;
    public file: File;

    public static requiredValidation: RegisterOptions<Certificate, any> = {
        required: { value: true, message: 'שדה חובה' },
    };

    public static fileValidation: RegisterOptions<Certificate, 'file'> = {
        required: { value: true, message: 'שדה חובה' },
        validate: (value) => {
            if (
                value?.name?.endsWith('.req') ||
                value?.name?.endsWith('.csr')
            ) {
                return true;
            }

            return 'סיומת קובץ לא תקינה';
        },
    };
}

export default Certificate;
