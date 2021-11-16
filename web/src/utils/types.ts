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
