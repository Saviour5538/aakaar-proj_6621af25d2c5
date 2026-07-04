import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Authorization header
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Interfaces for request and response types
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

// API client functions
export const register = (data: RegisterRequest) => api.post<AuthResponse>('/api/auth/register', data);

export const login = (data: LoginRequest) => api.post<AuthResponse>('/api/auth/login', data);

export const createTask = (data: CreateTaskRequest) => api.post<Task>('/api/tasks', data);

export const listTasks = () => api.get<Task[]>('/api/tasks');

export const updateTask = (id: number, data: UpdateTaskRequest) => api.put<Task>(`/api/tasks/${id}`, data);

export const deleteTask = (id: number) => api.delete<void>(`/api/tasks/${id}`);

// Auto-added stubs for functions a page imported but the client omitted.
export const getTask = async (id: string) => {
  const res = await api.get(`/api/tasks/${id}`);
  return res.data;
};
