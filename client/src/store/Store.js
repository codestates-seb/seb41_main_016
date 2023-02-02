import { configureStore } from "@reduxjs/toolkit";
import LoginState from "./LoginSlice";
import ModalState from "./ModalSlice";
import { WishState } from "./WishList";

export const store = configureStore({
  reducer: {
    Login: LoginState.reducer,
    Modal: ModalState.reducer,
    Wishlist: WishState.reducer,
  },
});

export default store;
