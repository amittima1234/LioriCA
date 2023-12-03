import axios from 'axios';
import Certificate from '../Models/Certificate';
import { appStore } from '../Redux/AppState';
import { certificateActions } from '../Redux/CertificateSlice';
import appConfig from '../Utils/AppConfig';

class CertificatesService {
    public async getCertificates(): Promise<Certificate[]> {
        let certificates = appStore.getState().certificates; // one time value

        if (certificates.length === 0) {
            // certificates = (
            //     await axios.get<Certificate[]>(appConfig.certificatesUrl)
            // ).data;

            // certificates = [{ uuid: '1', name: 'a', expirationDate: new Date('12/12/12') },
            // { uuid: '2', name: 'ao ntus trul k,gusv', expirationDate: new Date('12/12/12') },
            // { uuid: '3', name: 'c', expirationDate: new Date('12/12/12') },
            // { uuid: '4', name: 'd', expirationDate: new Date('12/12/12') },
            // { uuid: '5', name: 'e', expirationDate: new Date('12/12/12') },
            // { uuid: '6', name: 'f', expirationDate: new Date('12/12/12') },
            // { uuid: '7', name: 'g', expirationDate: new Date('12/12/12') },]

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
                        appConfig.certificatesUrl,
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
