import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Certificate from '../Models/Certificate';

// Reducers
function setAll(
    currentState: Certificate[],
    action: PayloadAction<Certificate[]>
): Certificate[] {
    return action.payload;
}

function addOne(
    currentState: Certificate[],
    action: PayloadAction<Certificate>
): Certificate[] {
    return [...currentState, action.payload];
}

const certificateSlice = createSlice({
    name: 'certificates',
    initialState: [],
    reducers: { setAll, addOne },
});

export const certificateActions = certificateSlice.actions;

export const certificateReducer = certificateSlice.reducer;
