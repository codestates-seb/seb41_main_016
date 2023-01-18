import { configureStore } from "@reduxjs/toolkit";
import LoginState from "./LoginSlice";
import ModalState from "./ModalSlice";

export const store = configureStore({
    reducer: {
        Login: LoginState.reducer,
        Modal: ModalState.reducer,
    },
});

export default store;
