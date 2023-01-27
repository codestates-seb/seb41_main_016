import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLike: false,
};
const LikeState = createSlice({
    name: "likestate",
    initialState,
    reducers: {
        heartClick: (state) => {
            state.isLike = !state.isLike;
        },
    },
});

export const { heartClick, heartUnclick } = LikeState.actions;

export default LikeState;
