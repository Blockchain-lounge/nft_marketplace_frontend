import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuth {
  isLoggedIn: boolean;
  token: null | string;
}

const initialState: IAuth = {
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLoggedInUser(state, action: PayloadAction<IAuth>) {
      state.token = action.payload.token;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    toggleLoggedInUser(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { handleLoggedInUser, toggleLoggedInUser } = authSlice.actions;

export default authSlice.reducer;
