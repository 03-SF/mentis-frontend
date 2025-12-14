// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// API Client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'An error occurred',
      }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient(API_URL);

// Auth API
export const authApi = {
  signup: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    studentInfo: {
      currentEducationLevel: string;
      grade: string;
      city?: string;
      province?: string;
      stream?: string;
    };
  }) => {
    return api.post('/auth/signup', data);
  },

  login: async (data: { email: string; password: string }) => {
    return api.post('/auth/login', data);
  },

  logout: async () => {
    return api.post('/auth/logout', {});
  },
};

// Profile API
export const profileApi = {
  getProfile: async () => {
    return api.get('/profile');
  },

  updateProfile: async (data: any) => {
    return api.put('/profile', data);
  },
};

// Users API
export const usersApi = {
  getProfile: async () => {
    return api.get('/users/me');
  },

  updateProfile: async (data: any) => {
    return api.patch('/users/me', data);
  },
};
