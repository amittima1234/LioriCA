import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import homeIcon from '../../Assets/Images/home.png';
import { AppState } from '../../Redux/AppState';
import certificatesService from '../../Services/CertificatesService';
import CertificateCard from '../CertificateCard/CertificateCard';
import './Certificates.css';

function Certificates(): JSX.Element {
    const certificates = useSelector(
        (appState: AppState) => appState.certificates
    ); // certifiactes subscription
    const _id = useSelector((appState: AppState) => appState.user._id);
    const navigate = useNavigate();

    useEffect(() => {
        certificatesService
            .getCertificates(_id)
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
                    <button className="NewCertificateBtn">
                        הנפקת תעודה חדשה
                    </button>
                </NavLink>
            </div>
        </>
    );
}

export default Certificates;
