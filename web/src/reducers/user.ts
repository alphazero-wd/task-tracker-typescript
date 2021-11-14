import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { User } from "../utils/types";

interface UserState {
  user: null | User;
  error: null | ValidationError;
  loading: boolean;
  message?: string;
}

interface ValidationError {
  field?: string;
  message?: string;
}

export const signUp = createAsyncThunk(
  "user/signUp",
  async (formValue: api.SignUp, { rejectWithValue }) => {
    try {
      const { data } = await api.signUp(formValue);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (formValue: api.Login, { rejectWithValue }) => {
    try {
      const { data } = await api.login(formValue);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await api.forgotPassword(email);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (resetValues: api.ResetValues, { rejectWithValue }) => {
    try {
      const { data } = await api.resetPassword(resetValues);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const initialState: UserState = {
  error: null,
  loading: false,
  user: JSON.parse(localStorage.getItem("user") as any),
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: state => {
      localStorage.clear();
      state.user = null;
    },
    clearMessage: state => {
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      });

    builder
      .addCase(login.pending, state => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      });
    builder
      .addCase(forgotPassword.pending, state => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.message = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      });
    builder
      .addCase(resetPassword.pending, state => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      });
  },
});
export const { logout, clearMessage } = userSlice.actions;
export default userSlice.reducer;
