import { useEffect, useState } from 'react';
import Certificate from '../../Models/Certificate';
import certificatesService from '../../Services/CertificatesService';
import CertificateCard from '../CertificateCard/CertificateCard';
import './AllCertificates.css';

function AllCertificates(): JSX.Element {
    const [certificates, setCertificates] = useState<Certificate[]>([]);

    useEffect(() => {
        certificatesService
            .getAllCertificates()
            .then((certs) => setCertificates(certs))
            .catch((err) => console.error(err.message));
    }, []);

    return (
        <div className="Certificates">
            <h1>כל התעודות</h1>
            <div>
                {certificates.map((certificate) => (
                    <CertificateCard
                        key={certificate.uuid}
                        certificate={certificate}
                    />
                ))}
            </div>
        </div>
    );
}

export default AllCertificates;
