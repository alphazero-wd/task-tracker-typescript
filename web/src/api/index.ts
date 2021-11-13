import axios from 'axios';
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

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

export const signUp = (formValue: SignUp) =>
  api.post('/user/signup', formValue);

export const login = (formValue: Login) => api.post('/user/login', formValue);
