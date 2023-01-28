import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const memberId = localStorage.getItem("memberId");
const token = localStorage.getItem("accessToken");

export const getWishList = createAsyncThunk("GET_WISH", async () => {
  const wishList = await (
    await axios.get(`/member/wishlists`, {
      headers: {
        Authorization: token,
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
