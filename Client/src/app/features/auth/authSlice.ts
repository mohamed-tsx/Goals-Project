import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authServices";

// Get user from Local Storage
const user = localStorage.getItem("user");
const parsedUser: string | null = user ? JSON.parse(user) : null;

const initialState = {
  user: parsedUser,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
interface User {
  email: string;
  password: string;
}

//Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user: User, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const typedError: any = error; // Replace with the specific error type if available
      const message =
        (typedError.response &&
          typedError.response.data &&
          typedError.response.data.message) ||
        typedError.message ||
        typedError.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//Login User
export const login = createAsyncThunk(
  "auth/login",
  async (user: User, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      const typedError: any = error; // Replace with the specific error type if available
      const message =
        (typedError.response &&
          typedError.response.data &&
          typedError.response.data.message) ||
        typedError.message ||
        typedError.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (typeof action.payload === "string") {
          state.message = action.payload;
        } else {
          // Handle the case where action.payload is not a string
          state.message = "An error occurred";
        }

        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (typeof action.payload === "string") {
          state.message = action.payload;
        } else {
          // Handle the case where action.payload is not a string
          state.message = "An error occurred";
        }

        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
