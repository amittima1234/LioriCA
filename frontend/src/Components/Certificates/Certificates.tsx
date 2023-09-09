import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../Redux/AppState';
import certificatesService from '../../Services/CertificatesService';
import CertificateCard from '../CertificateCard/CertificateCard';

function Certificates(): JSX.Element {
    const certificates = useSelector(
        (appState: AppState) => appState.certificates
    ); // certifiactes subscription

    useEffect(() => {
        certificatesService
            .getCertificates()
            .catch((err) => alert(err.message));
    }, []);

    return (
        <div className="ProductsList">
            {certificates.map((certificate) => (
                <CertificateCard
                    key={certificate.uuid}
                    certificate={certificate}
                />
            ))}

            <button>הנפקת תעודה חדשה</button>
        </div>
    );
}

export default Certificates;
