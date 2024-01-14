import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homeIcon from '../../Assets/Images/home.png';
import Certificate from '../../Models/Certificate';
import certificatesService from '../../Services/CertificatesService';
import CertificateCard from '../CertificateCard/CertificateCard';
import './AllCertificates.css';

function AllCertificates(): JSX.Element {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        certificatesService
            .getAllCertificates()
            .then((certs) => setCertificates(certs))
            .catch((err) => console.error(err.message));
    }, []);

    const navigateHome = () => {
        navigate('/home');
    };

    return (
        <>
            <div className="home">
                <img src={homeIcon} width={30} onClick={navigateHome}></img>
            </div>
            <div className="Certificates">
                <h1>כל התעודות</h1>
                <div>
                    {certificates.map((certificate) => (
                        <CertificateCard
                            key={certificate._id}
                            certificate={certificate}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default AllCertificates;
