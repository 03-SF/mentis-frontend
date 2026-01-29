// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
    console.log('API Request:', { url, method: options.method || 'GET' });

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    try {
      const response = await fetch(url, config);
      console.log('API Response status:', response.status);

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: `Request failed with status ${response.status}`,
        }));
        console.error('API Error:', error);
        
        // Create error object with response data
        const apiError = new Error(error.message || 'Request failed') as Error & { response?: { data: unknown; status: number } };
        apiError.response = { data: error, status: response.status };
        throw apiError;
      }

      const data = await response.json();
      console.log('API Success:', data);
      return data;
    } catch (err: unknown) {
      const error = err as Error & { response?: { data: { message?: string } }; message?: string; name?: string; stack?: string };
      console.error('Fetch error:', error);
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        response: error.response
      });
      // Re-throw with response attached if it exists
      if (!error.response && error.message) {
        const newError = new Error(error.message) as Error & { response?: { data: { message: string } } };
        newError.response = { data: { message: error.message } };
        throw newError;
      }
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create singleton instances
const apiClient = new ApiClient(API_URL);

// Export instances
export const api = apiClient;
export const authApi = {
  signup: (data: {
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
  }): Promise<unknown> => apiClient.post('/auth/signup', data),
  login: (data: { email: string; password: string }): Promise<unknown> => apiClient.post('/auth/login', data),
  logout: (): Promise<unknown> => apiClient.post('/auth/logout', {}),
};
export const profileApi = {
  getProfile: (): Promise<unknown> => apiClient.get('/profile/me'),
  updateProfile: (data: unknown): Promise<unknown> => apiClient.put('/profile/me', data),
};
export const usersApi = {
  getProfile: (): Promise<unknown> => apiClient.get('/users/me'),
  updateProfile: (data: unknown): Promise<unknown> => apiClient.patch('/users/me', data),
  getAllStudents: (): Promise<unknown> => apiClient.get('/users/students'),
};

// Assessment API
export const assessmentApi = {
  getQuestions: (): Promise<unknown> => apiClient.get('/assessment/questions'),
  submitAssessment: (data: { 
    answers: Array<{ questionId: string; selectedOptionIndex: number }>,
    preferences?: {
      comfortableWithPhysicalWork: boolean | null;
      wantsUniversityDegree: boolean | null;
      openToVocationalCareers: boolean | null;
    }
  }): Promise<unknown> => apiClient.post('/assessment/submit', data),
  getResult: (): Promise<unknown> => apiClient.get('/assessment/result'),
  getAllResults: (): Promise<unknown> => apiClient.get('/assessment/results/all'),
  getResultById: (resultId: string): Promise<unknown> => apiClient.get(`/assessment/result/${resultId}`),
  deleteResult: (resultId: string): Promise<unknown> => apiClient.delete(`/assessment/result/${resultId}`),
};

// Recommendation API
export const recommendationApi = {
  getRecommendation: (): Promise<unknown> => apiClient.get('/recommendation'),
  getUserRecommendation: (userId: string): Promise<unknown> => apiClient.get(`/recommendation/${userId}`),
  getAllRecommendations: (): Promise<unknown> => apiClient.get('/recommendation/all'),
  getRecommendationByResultId: (resultId: string): Promise<unknown> => apiClient.get(`/recommendation/result/${resultId}`),
};

// Admin API
export const adminApi = {
  getStats: (): Promise<unknown> => apiClient.get('/admin/stats'),
  getUsersWithData: (): Promise<unknown> => apiClient.get('/admin/users'),
};

