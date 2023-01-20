import { createSlice } from '@reduxjs/toolkit';
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

const initialState = {
  isLogin: !!accessToken,
  accessToken,
  refreshToken,
};

const LoginState = createSlice({
  name: 'loginstate',
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
