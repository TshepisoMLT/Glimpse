import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

// API Configuration
const API_BASE_URL = 'https://api.example.com'; // Replace with your API URL
const API_TIMEOUT = 10000; // 10 seconds

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear auth state
      useAuthStore.getState().clearAuth();
      
      // You could implement token refresh here
      // const newToken = await refreshToken();
      // if (newToken) {
      //   useAuthStore.getState().setToken(newToken);
      //   return api(originalRequest);
      // }
    }

    return Promise.reject(error);
  }
);

// API Response types
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Service class
export class ApiService {
  // Auth endpoints
  static async login(email: string, password: string): Promise<ApiResponse> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  }

  static async register(email: string, password: string, name: string): Promise<ApiResponse> {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  }

  static async logout(): Promise<ApiResponse> {
    const response = await api.post('/auth/logout');
    return response.data;
  }

  // User endpoints
  static async getProfile(): Promise<ApiResponse> {
    const response = await api.get('/user/profile');
    return response.data;
  }

  static async updateProfile(data: any): Promise<ApiResponse> {
    const response = await api.put('/user/profile', data);
    return response.data;
  }

  // File upload
  static async uploadFile(file: any, onProgress?: (progress: number) => void): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
    return response.data;
  }

  // Generic CRUD operations
  static async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await api.get(url, config);
    return response.data;
  }

  static async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await api.post(url, data, config);
    return response.data;
  }

  static async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await api.put(url, data, config);
    return response.data;
  }

  static async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await api.delete(url, config);
    return response.data;
  }

  static async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await api.patch(url, data, config);
    return response.data;
  }
}

// Custom hooks for API calls
export const useApi = () => {
  const { token, clearAuth } = useAuthStore();

  const authenticatedApi = {
    ...ApiService,
    // Override methods to include auth token
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
      if (!token) {
        clearAuth();
        throw new Error('No authentication token');
      }
      return ApiService.get<T>(url, config);
    },

    post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
      if (!token) {
        clearAuth();
        throw new Error('No authentication token');
      }
      return ApiService.post<T>(url, data, config);
    },

    put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
      if (!token) {
        clearAuth();
        throw new Error('No authentication token');
      }
      return ApiService.put<T>(url, data, config);
    },

    delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
      if (!token) {
        clearAuth();
        throw new Error('No authentication token');
      }
      return ApiService.delete<T>(url, config);
    },
  };

  return authenticatedApi;
};

export default api; 