import { createSlice } from "@reduxjs/toolkit";
import {
  accessToken,
  refreshToken,
  memberId,
  kakaoAccessToken,
} from "../utils/localStorage";

const initialState = {
  isLogin: !!accessToken,
  accessToken,
  refreshToken,
  memberId,
  kakaoAccessToken,
};

const LoginState = createSlice({
  name: "loginstate",
  initialState,
  reducers: {
    login: (state) => {
      accessToken === undefined
        ? (state.isLogin = false)
        : (state.isLogin = true);
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = LoginState.actions;

export default LoginState;
