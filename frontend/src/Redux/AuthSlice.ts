import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import User from '../Models/User';

function register(currentState: User, action: PayloadAction<User>): User {
    return action.payload;
}

function login(currentState: User, action: PayloadAction<User>): User {
    return action.payload;
}

function logout(currentState: User, action: PayloadAction<void>): User {
    return null;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: null,
    reducers: { register, login, logout },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
