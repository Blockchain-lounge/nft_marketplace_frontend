import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuth {
  isLoggedIn: boolean;
}

const initialState: IAuth = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLoggedInUser(state, action: PayloadAction<IAuth>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    toggleLoggedInUser(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { handleLoggedInUser, toggleLoggedInUser } = authSlice.actions;

export default authSlice.reducer;
