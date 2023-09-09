import { configureStore } from '@reduxjs/toolkit';
import Certificate from '../Models/Certificate';
import User from '../Models/User';
import { authReducer } from './AuthSlice';
import { certificateReducer } from './CertificateSlice';

export type AppState = {
    certificates: Certificate[];
    user: User;
};

export const appStore = configureStore<AppState>({
    reducer: {
        certificates: certificateReducer,
        user: authReducer,
    },
});
