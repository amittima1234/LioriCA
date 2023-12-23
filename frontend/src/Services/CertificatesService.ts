import axios from 'axios';
import Certificate from '../Models/Certificate';
import { appStore } from '../Redux/AppState';
import { certificateActions } from '../Redux/CertificateSlice';
import appConfig from '../Utils/AppConfig';

class CertificatesService {
    public async getCertificates(): Promise<Certificate[]> {
        let certificates = appStore.getState().certificates; // one time value

        if (certificates.length === 0) {
            certificates = (
                await axios.get<Certificate[]>(appConfig.certificatesUrl)
            ).data;

            appStore.dispatch(certificateActions.setAll(certificates));
        }

        return certificates;
    }

    public async addCertificate(
        certificate: Partial<Certificate>
    ): Promise<void> {
        appStore.dispatch(
            certificateActions.addOne(
                (
                    await axios.patch<Certificate>(
                        "http://localhost:8008/upload",
                        certificate,
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
