import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import modalReudcer from "../reducers/modalReudcer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReudcer,
  },
});

export default store;
