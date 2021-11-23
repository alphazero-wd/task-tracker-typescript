import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import { Login, ResetValues, SignUp, UpdateValues, User } from '../utils/types';

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
  'user/signUp',
  async (formValue: SignUp, { rejectWithValue }) => {
    try {
      const { data } = await api.signUp(formValue);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (formValue: Login, { rejectWithValue }) => {
    try {
      const { data } = await api.login(formValue);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
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
  'user/resetPassword',
  async (resetValues: ResetValues, { rejectWithValue }) => {
    try {
      const { data } = await api.resetPassword(resetValues);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (updateValues: UpdateValues, { rejectWithValue }) => {
    try {
      const { data } = await api.updateProfile(updateValues);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const deleteUser = createAsyncThunk('user/deleteUser', async () => {
  try {
    const { data } = await api.deleteUser();
    return data.message;
  } catch (error: any) {
    console.log(error.response.data.error);
  }
});

const initialState: UserState = {
  error: null,
  loading: false,
  user: JSON.parse(localStorage.getItem('user') as any),
  message: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.user = null;
    },
    clearMessage: (state) => {
      state.message = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
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
      .addCase(login.pending, (state) => {
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
      .addCase(forgotPassword.pending, (state) => {
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
      .addCase(resetPassword.pending, (state) => {
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
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      localStorage.removeItem('user');
      state.user = null;
      state.message = action.payload;
    });
  },
});
export const { logout, clearMessage } = userSlice.actions;
export default userSlice.reducer;
