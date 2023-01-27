import { configureStore } from "@reduxjs/toolkit";
import KakaoState from "./KakaoSlice";
import LoginState from "./LoginSlice";
import ModalState from "./ModalSlice";

export const store = configureStore({
  reducer: {
    Login: LoginState.reducer,
    Modal: ModalState.reducer,
    KakaoLogin: KakaoState.reducer,
  },
});

export default store;
