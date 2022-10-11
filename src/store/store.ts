import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import authReducer from "@/src/reducers/authReducer";
import modalReudcer from "@/src/reducers/modalReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReudcer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
