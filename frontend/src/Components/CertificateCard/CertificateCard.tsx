import certificateIcon from '../../Assets/Images/certificate-icon.png';
import Certificate from '../../Models/Certificate';

interface CertificateCardProps {
    certificate: Certificate;
}

function CertificateCard({ certificate }: CertificateCardProps): JSX.Element {
    return (
        <div className="CertificateCard">
            <div className="Details">
                {certificate.name}
                <br />
                {certificate.expirationDate.toDateString()}$
            </div>
            <div className="Image">
                <img src={certificateIcon}></img>
            </div>
        </div>
    );
}

export default CertificateCard;
