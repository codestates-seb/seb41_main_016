import { configureStore } from "@reduxjs/toolkit";
import LoginState from "./LoginSlice";
import ModalState from "./ModalSlice";
import { LikeState } from "./WishList";

export const store = configureStore({
  reducer: {
    Login: LoginState.reducer,
    Modal: ModalState.reducer,
    Wishlist: LikeState.reducer,
  },
});

export default store;
