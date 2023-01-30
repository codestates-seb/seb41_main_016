import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLike: false,
};
const LikeState = createSlice({
  name: "likestate",
  initialState,
  reducers: {
    likeOpen: (state, action) => {
      state.isLike = true;
    },
    likeClose: (state) => {
      state.isLike = false;
    },
  },
});

export const { likeOpen, likeClose } = LikeState.actions;

export default LikeState;
