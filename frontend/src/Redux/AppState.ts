import { configureStore } from '@reduxjs/toolkit';
import User from '../Models/User';
import { authReducer } from './AuthSlice';

export type AppState = {
    user: User;
};

export const appStore = configureStore<AppState>({
    reducer: {
        user: authReducer,
    },
});
