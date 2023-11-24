import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/features/auth/authSlice";
import goalReducer from "../app/features/goals/goalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
