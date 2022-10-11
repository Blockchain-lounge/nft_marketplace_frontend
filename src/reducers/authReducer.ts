import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLoggedInUser(state, action) {
      state.isLoggedIn = action.payload;
    },
    toggleLoggedInUser(state, action) {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { handleLoggedInUser, toggleLoggedInUser } = authSlice.actions;

export default authSlice.reducer;
