import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { accessToken } from "../utils/localStorage";

export const getWishList = createAsyncThunk("GET_WISH", async () => {
  const wishList = await (
    await axios.get(`/member/wishlists`, {
      headers: {
        Authorization: accessToken,
      },
    })
  ).data;
  return wishList.data;
});

const initialState = [];

export const LikeState = createSlice({
  name: "likestate",
  initialState,
  reducers: {},
  extraReducers: {
    [getWishList.fulfilled]: (state, { payload }) => [...payload],
  },
});
