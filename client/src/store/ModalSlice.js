import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModal: false,
};
const ModalState = createSlice({
    name: "modalstate",
    initialState,
    reducers: {
        modalOpen: (state) => {
            state.isModal = true;
        },
        modalClose: (state) => {
            state.isModal = false;
        },
    },
});

export const { modalClose, modalOpen } = ModalState.actions;

export default ModalState;
