import axios, { AxiosInstance, AxiosError } from 'axios';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth')) {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  register: async (data: { name: string; email: string; password: string; role?: string }) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};

// Profile API
export const profileApi = {
  createProfile: async (data: {
    educationLevel?: string;
    subjects?: string[];
    interests?: string[];
    city?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
  }) => {
    const response = await apiClient.post('/profile', data);
    return response.data;
  },

  getMyProfile: async () => {
    const response = await apiClient.get('/profile/me');
    return response.data;
  },

  updateMyProfile: async (data: {
    educationLevel?: string;
    subjects?: string[];
    interests?: string[];
    city?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
  }) => {
    const response = await apiClient.put('/profile/me', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/profile');
    return response.data;
  },

  updateProfile: async (data: unknown) => {
    const response = await apiClient.put('/profile', data);
    return response.data;
  },

  deleteProfile: async () => {
    const response = await apiClient.delete('/profile');
    return response.data;
  },
};

// User API (Admin only)
export const userApi = {
  getAllUsers: async (params?: { page?: number; limit?: number; role?: string }) => {
    const response = await apiClient.get('/users', { params });
    return response.data;
  },

  getUserById: async (id: string) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: string, data: unknown) => {
    const response = await apiClient.put(`/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
};

export default apiClient;
