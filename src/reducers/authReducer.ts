import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLoggedInUser(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    toggleLoggedInUser(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { handleLoggedInUser, toggleLoggedInUser } = authSlice.actions;

export default authSlice.reducer;
