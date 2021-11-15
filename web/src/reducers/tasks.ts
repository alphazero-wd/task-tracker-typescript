import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../utils/types";
import * as api from "../api";
export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  try {
    const { data } = await api.getTasks();
    console.log(data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
});
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: Omit<Task, "taskId">) => {
    try {
      const { data } = await api.addTask(task);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

interface TasksState {
  tasks: Task[];
  displayedTasks: Task[];
  loading: boolean;
}
const initialState: TasksState = {
  tasks: [],
  displayedTasks: [],
  loading: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    queryTasks: (state, action) => {
      let results = [...state.tasks];
      results = results.filter(task =>
        task.taskName
          .toLowerCase()
          .includes(action.payload.search.toLowerCase())
      );
      if (action.payload.filterBy) {
        switch (action.payload.filterBy) {
          case "importantTasks":
            results = results.filter(task => task.isImportant);
            break;
          case "completedTasks":
            results = results.filter(task => task.isCompleted);
            break;
          case "incompletedTasks":
            results = results.filter(task => !task.isCompleted);
            break;
          default:
            break;
        }
      }
      if (action.payload.sortBy) {
        switch (action.payload.sortBy) {
          case "a-z":
            results = results.sort((a, b) =>
              a.taskName < b.taskName ? -1 : 1
            );
            break;
          case "z-a":
            results = results.sort((a, b) =>
              a.taskName < b.taskName ? -1 : 1
            );
            break;
          case "latest":
            results = results.sort((a, b) =>
              new Date(a.createdAt as any).getTime() -
              new Date(b.createdAt as any).getTime()
                ? -1
                : 1
            );
            break;
          case "oldest":
            results = results.sort((a, b) =>
              new Date(a.createdAt as any).getTime() -
              new Date(b.createdAt as any).getTime()
                ? 1
                : -1
            );
            break;
          default:
            break;
        }
      }
      state.displayedTasks = results;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTasks.pending, state => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
  },
});
export const { queryTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
