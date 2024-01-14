import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppState } from '../../Redux/AppState';
import certificatesService from '../../Services/CertificatesService';
import CertificateCard from '../CertificateCard/CertificateCard';
import './Certificates.css';

function Certificates(): JSX.Element {
    const certificates = useSelector(
        (appState: AppState) => appState.certificates
    ); // certifiactes subscription
    const _id = useSelector((appState: AppState) => appState.user._id);

    useEffect(() => {
        certificatesService
            .getCertificates(_id)
            .catch((err) => console.error(err.message));
    }, []);

    return (
        <div className="Certificates">
            <h1>התעודות שלי</h1>
            <div>
                {certificates.map((certificate) => (
                    <CertificateCard
                        key={certificate._id}
                        certificate={certificate}
                    />
                ))}
            </div>

            <NavLink to="/certificates/new">
                <button className="NewCertificateBtn">הנפקת תעודה חדשה</button>
            </NavLink>
        </div>
    );
}

export default Certificates;
