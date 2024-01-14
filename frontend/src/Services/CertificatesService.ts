import axios from 'axios';
import Certificate from '../Models/Certificate';
import { appStore } from '../Redux/AppState';
import { certificateActions } from '../Redux/CertificateSlice';
import appConfig from '../Utils/AppConfig';

class CertificatesService {
    public async getCertificates(_id: string): Promise<Certificate[]> {
        let certificates = appStore.getState().certificates; // one time value

        if (certificates.length === 0) {
            certificates = (
                await axios.get<Certificate[]>(
                    `${appConfig.certificatesUrl}/${_id}`
                )
            ).data;

            appStore.dispatch(certificateActions.setAll(certificates));
        }

        return certificates;
    }

    public async addCertificate(
        certificate: Partial<Certificate>,
        _id: string
    ): Promise<Certificate> {
        const newCertificate: Certificate = (
            await axios.post<Certificate>(
                appConfig.uploadCertificateUrl,
                { ...certificate, userID: _id },
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            )
        ).data;
        appStore.dispatch(certificateActions.addOne(newCertificate));

        return newCertificate;
    }

    public async getAllCertificates(): Promise<Certificate[]> {
        return (await axios.get<Certificate[]>(`${appConfig.certificatesUrl}`))
            .data;
    }
}

const certificatesService = new CertificatesService();

export default certificatesService;
