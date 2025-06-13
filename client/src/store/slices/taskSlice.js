import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TASK_BASE } from "@/lib/env";
import axios from "axios";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(TASK_BASE, { withCredentials: true });

      return response.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch tasks";
      return rejectWithValue(message);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post(TASK_BASE, taskData, {
        withCredentials: true,
      });

      return response.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to create task";
      return rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${TASK_BASE}/${id}`, updates, {
        withCredentials: true,
      });

      return response.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to update task";
      return rejectWithValue(message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${TASK_BASE}/${id}`, { withCredentials: true });

      return id;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to delete task";
      return rejectWithValue(message);
    }
  }
);

export const toggleTaskStatus = createAsyncThunk(
  "tasks/toggleTaskStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${TASK_BASE}/${id}/toggle`,
        {},
        { withCredentials: true }
      );

      return response.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to toggle status";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  tasks: [],
  fetchingTasks: false,
  creatingTask: false,
  updatingTask: false,
  deletingTask: false,
  changingStatus: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.fetchingTasks = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.fetchingTasks = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.fetchingTasks = false;
        state.error = action.payload;
      })

      .addCase(createTask.pending, (state) => {
        state.creatingTask = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.creatingTask = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.creatingTask = false;
        state.error = action.payload;
      })

      .addCase(updateTask.pending, (state) => {
        state.updatingTask = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.updatingTask = false;
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updatingTask = false;
        state.error = action.payload;
      })

      .addCase(deleteTask.pending, (state) => {
        state.deletingTask = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deletingTask = false;
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deletingTask = false;
        state.error = action.payload;
      })

      .addCase(toggleTaskStatus.pending, (state) => {
        state.changingStatus = true;
        state.error = null;
      })
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        state.changingStatus = false;
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(toggleTaskStatus.rejected, (state, action) => {
        state.changingStatus = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
