import axios from "axios";
import { Login, ResetValues, SignUp, Task, UpdateValues } from "../utils/types";

const api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/api` });
api.interceptors.request.use(req => {
  const user = JSON.parse(localStorage.getItem("user") as any);
  if (user) {
    req.headers!.authorization = `Bearer ${user.token}`;
  }
  return req;
});

export const signUp = (formValue: SignUp) =>
  api.post("/user/signup", formValue);

export const login = (formValue: Login) => api.post("/user/login", formValue);
export const forgotPassword = (email: string) =>
  api.post("/user/forgot-password", {
    email,
  });

export const resetPassword = (resetValues: ResetValues) =>
  api.put(`/user/reset-password/${resetValues.token}`, resetValues);
export const updateProfile = (updateValues: UpdateValues) =>
  api.put("/user/update-profile", updateValues);
export const deleteUser = () => api.delete("/user/delete-user");

export const getTasks = () => api.get("/tasks");
export const addTask = (task: Pick<Task, "taskName">) =>
  api.post("/tasks", task);
export const updateTask = (task: Partial<Task>) =>
  api.put(`/tasks/${task.taskId}`, task);
export const deleteTask = (taskId: number | string) =>
  api.delete(`/tasks/${taskId}`);
