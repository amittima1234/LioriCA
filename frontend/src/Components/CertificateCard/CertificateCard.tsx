import certificateIcon from '../../Assets/Images/certificate-icon.png';
import Certificate from '../../Models/Certificate';
import './CertificateCard.css';

interface CertificateCardProps {
    certificate: Certificate;
}

function CertificateCard({ certificate }: CertificateCardProps): JSX.Element {
    return (
        <div className='CertificateCard'>
            <div className='Details'>
                <span className='Name'>{certificate.name}</span>
                <span>
                    תאריך תפוגה
                    <br />
                    {certificate.expirationDate.toLocaleString().split(',')[0]}
                </span>
            </div>
            <div className='Image'>
                <img src={certificateIcon} width={100}></img>
            </div>
        </div>
    );
}

export default CertificateCard;
