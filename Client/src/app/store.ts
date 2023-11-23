import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
