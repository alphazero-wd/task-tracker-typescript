import axios from "axios";
import { Task } from "../utils/types";
export interface SignUp {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface Login {
  usernameOrEmail: string;
  password: string;
}
export interface ResetValues {
  password: string;
  token?: string;
  confirmPassword: string;
}
const api = axios.create({ baseURL: "http://localhost:5000/api" });
api.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user') as any)
  if(user)  {
    req.headers!.authorization = `Bearer ${user.token}` 
  }
  return req;
})

export const signUp = (formValue: SignUp) =>
  api.post("/user/signup", formValue);

export const login = (formValue: Login) => api.post("/user/login", formValue);
export const forgotPassword = (email: string) =>
  api.post("/user/forgot-password", {
    email,
  });

export const resetPassword = (resetValues: ResetValues) =>
  api.put(`/user/reset-password/${resetValues.token}`, resetValues);

export const getTasks = () => api.get("/tasks");
export const addTask = (task: Omit<Task, "taskId">) => api.post("/tasks", task);
export const updateTask = (task: Required<Task>) =>
  api.put(`/tasks/${task.taskId}`, task);
export const deleteTask = (taskId: number | string) =>
  api.delete(`/tasks/${taskId}`);
