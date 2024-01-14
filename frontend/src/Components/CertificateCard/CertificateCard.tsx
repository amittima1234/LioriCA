import { format } from 'date-fns';
import certificateIcon from '../../Assets/Images/certificate-icon.png';
import Certificate from '../../Models/Certificate';
import './CertificateCard.css';
import fileDownloaderService from '../../Services/FileDownloaderService';

interface CertificateCardProps {
    certificate: Certificate;
}

function CertificateCard({ certificate }: CertificateCardProps): JSX.Element {
    return (
        <div className="CertificateCard">
            <div className="Details">
                <span className="Name">{certificate.name}</span>
                <span>
                    תאריך תפוגה
                    <br />
                    {format(certificate.expirationDate, 'dd/MM/yyyy')}
                </span>
            </div>
            <div
                className="Image"
                onClick={() =>
                    fileDownloaderService.downloadCertificate(certificate)
                }
            >
                <img src={certificateIcon} width={100}></img>
                <span className="Tooltip">לחץ להורדה</span>
            </div>
        </div>
    );
}

export default CertificateCard;
