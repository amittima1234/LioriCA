import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Certificate from '../../Models/Certificate';
import certificatesService from '../../Services/CertificatesService';
import uploadIcon from '../../Assets/Images/upload-icon.png';
import './NewCertificate.css';
import { useSelector } from 'react-redux';
import { AppState } from '../../Redux/AppState';

function NewCertificate() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Certificate>({ shouldUnregister: false });
    const navigate = useNavigate();
    const _id = useSelector((appState: AppState) => appState.user._id);

    const [file, setFile] = useState(undefined);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = (e.target as HTMLInputElement).files[0];
        file?.name?.endsWith('.req') || file?.name?.endsWith('.csr')
            ? setFile(file)
            : alert('סיומת קובץ לא תקינה');
    };

    const onFormSubmit = async (certificate: Partial<Certificate>) => {
        certificate.file = file;

        try {
            await certificatesService.addCertificate(certificate, _id);
            navigate('/certificates');
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <div className="NewCertificate">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div>
                    <label>שם התעודה</label>
                    <input
                        type="text"
                        {...register('name', Certificate.requiredValidation)}
                    />
                    <small className="Error">{errors?.name?.message}</small>
                </div>

                <div>
                    <div className="Upload">
                        <label>העלאת תעודה</label>
                        <input
                            id="file"
                            type="file"
                            {...register('file', Certificate.fileValidation)}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <button
                            type="button"
                            onClick={() =>
                                document.getElementById('file').click()
                            }
                        >
                            <span>בחר</span>
                            <img src={uploadIcon} width={10}></img>
                        </button>
                    </div>
                    <div style={{ fontSize: '9px', marginRight: '3px' }}>
                        {file?.name || ''}
                    </div>
                    <small className="Error">{errors?.file?.message}</small>
                </div>

                <button>הוספה</button>
            </form>
        </div>
    );
}

export default NewCertificate;
