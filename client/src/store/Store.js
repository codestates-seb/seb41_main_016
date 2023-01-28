import { configureStore } from "@reduxjs/toolkit";
import KakaoState from "./KakaoSlice";
import LoginState from "./LoginSlice";
import ModalState from "./ModalSlice";
import { LikeState } from "./WishList";

export const store = configureStore({
  reducer: {
    Login: LoginState.reducer,
    Modal: ModalState.reducer,
    KakaoLogin: KakaoState.reducer,
    Wishlist: LikeState.reducer,
  },
});

export default store;
