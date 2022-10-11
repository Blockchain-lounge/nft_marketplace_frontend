import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isMobileModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
    toggleModalOpen(state, action) {
      state.isModalOpen = !state.isModalOpen;
    },
    handleMobileModal(state, action) {
      state.isMobileModalOpen = action.payload;
    },
    toggleMobileModal(state, action) {
      state.isMobileModalOpen = !state.isMobileModalOpen;
    },
  },
});

export const {
  handleModalOpen,
  toggleModalOpen,
  toggleMobileModal,
  handleMobileModal,
} = modalSlice.actions;

export default modalSlice.reducer;
