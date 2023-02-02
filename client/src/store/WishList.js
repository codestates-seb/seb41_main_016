import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { accessToken } from "../utils/localStorage";

export const getWishList = createAsyncThunk("GET_WISH", async () => {
  const wishList = await (
    await axios.get(`${process.env.REACT_APP_API_URL}/member/wishlists`, {
      headers: {
        Authorization: accessToken,
      },
    })
  ).data;
  return wishList.data;
});

const initialState = [];

export const WishState = createSlice({
  name: "wishstate",
  initialState,
  reducers: {},
  extraReducers: {
    [getWishList.fulfilled]: (state, { payload }) => [...payload],
  },
});
