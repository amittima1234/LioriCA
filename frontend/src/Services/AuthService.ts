import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Credentials from '../Models/Credentials';
import User from '../Models/User';
import { appStore } from '../Redux/AppState';
import { authActions } from '../Redux/AuthSlice';
import appConfig from '../Utils/AppConfig';

class AuthService {
    public async register(user: User): Promise<void> {
        const token = (await axios.post<string>(appConfig.registerUrl, user))
            .data;
        localStorage.setItem('token', token);
        const registeredUser = jwtDecode<{ user: User }>(token).user;
        appStore.dispatch(authActions.register(registeredUser));
    }

    public async login(credentials: Credentials): Promise<void> {
        const token = (
            await axios.post<string>(appConfig.loginUrl, credentials)
        ).data;
        localStorage.setItem('token', token);
        const loggedInUser = jwtDecode<{ user: User }>(token).user;
        appStore.dispatch(authActions.login(loggedInUser));
    }

    public logout() {
        appStore.dispatch(authActions.logout());
        localStorage.removeItem('token');
    }

    public loadToken() {
        const token = localStorage.getItem('token');
        if (token) {
            const loggedInUser = jwtDecode<{ user: User }>(token).user;
            appStore.dispatch(authActions.login(loggedInUser));
        }
    }
}

const authService = new AuthService();
authService.loadToken();

export default authService;
