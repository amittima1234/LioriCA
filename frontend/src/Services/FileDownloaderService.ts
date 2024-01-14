import Certificate from '../Models/Certificate';

class FileDownloaderService {
    public downloadCertificate(certificate: Certificate): void {
        const url = window.URL.createObjectURL(new Blob([certificate.file]));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${'crt' + Date.now()}.crt`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }
}

const fileDownloaderService = new FileDownloaderService();

export default fileDownloaderService;
