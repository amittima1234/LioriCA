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

    public async addProduct(certificate: Certificate): Promise<void> {
        appStore.dispatch(
            certificateActions.addOne(
                (
                    await axios.post<Certificate>(
                        appConfig.certificatesUrl,
                        certificate
                    )
                ).data
            )
        );
    }
}

const certificatesService = new CertificatesService();

export default certificatesService;
