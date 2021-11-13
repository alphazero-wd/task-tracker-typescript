import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import { User } from '../utils/types';

interface UserState {
  user: null | User;
  error: null | ValidationError;
  loading: boolean;
}

interface ValidationError {
  field?: string;
  message?: string;
}

export const signUp = createAsyncThunk(
  'user/signUp',
  async (formValue: api.SignUp, { rejectWithValue }) => {
    try {
      const { data } = await api.signUp(formValue);
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (formValue: api.Login, { rejectWithValue }) => {
    try {
      const { data } = await api.login(formValue);
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const initialState: UserState = {
  error: null,
  loading: false,
  user: JSON.parse(localStorage.getItem('user') as any) || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      });
  },
});
export default userSlice.reducer;
