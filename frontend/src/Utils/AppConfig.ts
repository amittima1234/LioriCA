class AppConfig {
    private urlPrefix = 'http://localhost:3030/api/';

    public certificatesUrl = `${this.urlPrefix}certificates`;
    public registerUrl = `${this.urlPrefix}register`;
    public loginUrl = `${this.urlPrefix}login`;
}

const appConfig = new AppConfig();

export default appConfig;
