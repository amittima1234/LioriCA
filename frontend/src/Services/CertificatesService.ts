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
    ): Promise<void> {
        appStore.dispatch(
            certificateActions.addOne(
                (
                    await axios.patch<Certificate>(
                        appConfig.uploadCertificateUrl,
                        { ...certificate, userID: _id },
                        {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        }
                    )
                ).data
            )
        );
    }
}

const certificatesService = new CertificatesService();

export default certificatesService;
