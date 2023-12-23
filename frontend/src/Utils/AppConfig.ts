class AppConfig {
    private cerificatesUrlPrefix = 'http://localhost:8008/';
    private authUrlPrefix = 'http://localhost:3000/';

    public certificatesUrl = `${this.cerificatesUrlPrefix}certificates`;
    public uploadCertificateUrl = `${this.cerificatesUrlPrefix}upload`;
    public registerUrl = `${this.authUrlPrefix}register`;
    public loginUrl = `${this.authUrlPrefix}login`;
}

const appConfig = new AppConfig();

export default appConfig;
