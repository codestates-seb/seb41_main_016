import { createSlice } from "@reduxjs/toolkit";
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");
const memberId = localStorage.getItem("memberId");
const kakaoAccessToken = localStorage.getItem("kakaoAccessToken");

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
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = LoginState.actions;

export default LoginState;
