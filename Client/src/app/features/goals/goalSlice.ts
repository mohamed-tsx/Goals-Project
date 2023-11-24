import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState: any = {
  goals: [],
  isError: false,
  isSucces: false,
  isLoading: false,
  message: "",
};
// Create new goal
export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData: any, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.user.token;
      return await goalService.createGoal(goalData, token);
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

//Get user goals
export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI: any) => {
    try {
      const token = (thunkAPI.getState() as any).auth.user.token;
      return await goalService.getGoals(token);
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

//delete goal
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id: any, thunkAPI: any) => {
    try {
      const token = (thunkAPI.getState() as any).auth.user.token;
      return await goalService.deleteGoal(id, token);
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
export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        console.log("Action Payload:", action.payload);
        if (action.payload) {
          state.goals.push(action.payload);
        } else {
          console.error("Received null value for action.payload");
        }
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (typeof action.payload === "string") {
          state.message = action.payload;
        } else {
          // Handle the case where action.payload is not a string
          state.message = "An error occurred";
        }
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (typeof action.payload === "string") {
          state.message = action.payload;
        } else {
          // Handle the case where action.payload is not a string
          state.message = "An error occurred";
        }
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.goals = state.goals.filter(
          (goal: any) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (typeof action.payload === "string") {
          state.message = action.payload;
        } else {
          // Handle the case where action.payload is not a string
          state.message = "An error occurred";
        }
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
