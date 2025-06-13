import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_BASE } from "@/lib/env";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${USER_BASE}/${userId}`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch user";
      return rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${USER_BASE}/${userId}`, userData, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to update user";
      return rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`${USER_BASE}/${userId}`, {
        withCredentials: true,
      });
      return userId;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to delete user";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  deleting: false,
  updating: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUserData(state) {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updating = false;
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      .addCase(deleteUser.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.deleting = false;
        state.data = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
