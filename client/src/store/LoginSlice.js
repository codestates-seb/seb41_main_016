import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
};
const LoginState = createSlice({
    name: "loginstate",
    initialState,
    reducers: {
        login: (state) => {
            state.isLogin = true;
        },
        logout: (state) => {
            state.isLogin = false;
        },
    },
});

export const { login, logout } = LoginState.actions;

export default LoginState;
