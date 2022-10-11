import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isMobileModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    toggleModalOpen(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    handleMobileModal(state, action: PayloadAction<boolean>) {
      state.isMobileModalOpen = action.payload;
    },
    toggleMobileModal(state) {
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
