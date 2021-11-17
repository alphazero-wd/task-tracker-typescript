export interface Task {
  taskId: string | number;
  taskName: string;
  isImportant: boolean;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
export interface User {
  username: string;
  email: string;
  token: string;
}
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
export interface UpdateValues {
  username?: string;
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}
