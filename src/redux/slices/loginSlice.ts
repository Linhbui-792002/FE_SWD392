import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface User {
    data: any;
    details: any;
}

const initialState: User = {
    data: null,
    details: null,
};

const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.data = action.payload as any;
            // Lưu thông tin đăng nhập vào localStorage
            localStorage.setItem('user', JSON.stringify(action.payload.data));
        },
        logout: (state) => {
            state.data = null;
            localStorage.removeItem('user');
        },
        setUserDetails: (state, action) => {
            state.details = action.payload;
        },
    },
})
export const { loginSuccess, logout, setUserDetails } = loginSlice.actions;
export default loginSlice.reducer;