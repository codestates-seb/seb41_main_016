import { configureStore } from "@reduxjs/toolkit";
import LikeState from "./LikeSlice";
import LoginState from "./LoginSlice";
import ModalState from "./ModalSlice";
import { WishState } from "./WishList";

export const store = configureStore({
  reducer: {
    Login: LoginState.reducer,
    Modal: ModalState.reducer,
    Wishlist: WishState.reducer,
    Like: LikeState.reducer,
  },
});

export default store;
