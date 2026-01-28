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
        const apiError: any = new Error(error.message || 'Request failed');
        apiError.response = { data: error, status: response.status };
        throw apiError;
      }

      const data = await response.json();
      console.log('API Success:', data);
      return data;
    } catch (err: any) {
      console.error('Fetch error:', err);
      console.error('Error details:', {
        message: err.message,
        name: err.name,
        stack: err.stack,
        response: err.response
      });
      // Re-throw with response attached if it exists
      if (!err.response && err.message) {
        const error: any = new Error(err.message);
        error.response = { data: { message: err.message } };
        throw error;
      }
      throw err;
    }
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
  }): Promise<any> => apiClient.post('/auth/signup', data),
  login: (data: { email: string; password: string }): Promise<any> => apiClient.post('/auth/login', data),
  logout: (): Promise<any> => apiClient.post('/auth/logout', {}),
};
export const profileApi = {
  getProfile: (): Promise<any> => apiClient.get('/profile/me'),
  updateProfile: (data: any): Promise<any> => apiClient.put('/profile/me', data),
};
export const usersApi = {
  getProfile: (): Promise<any> => apiClient.get('/users/me'),
  updateProfile: (data: any): Promise<any> => apiClient.patch('/users/me', data),
  getAllStudents: (): Promise<any> => apiClient.get('/users/students'),
};

// Assessment API
export const assessmentApi = {
  getQuestions: (): Promise<any> => apiClient.get('/assessment/questions'),
  submitAssessment: (data: { 
    answers: Array<{ questionId: string; selectedOptionIndex: number }> 
  }): Promise<any> => apiClient.post('/assessment/submit', data),
  getResult: (): Promise<any> => apiClient.get('/assessment/result'),
  getAllResults: (): Promise<any> => apiClient.get('/assessment/results/all'),
  getResultById: (resultId: string): Promise<any> => apiClient.get(`/assessment/result/${resultId}`),
  deleteResult: (resultId: string): Promise<any> => apiClient.delete(`/assessment/result/${resultId}`),
};

// Recommendation API
export const recommendationApi = {
  getRecommendation: (): Promise<any> => apiClient.get('/recommendation'),
  getUserRecommendation: (userId: string): Promise<any> => apiClient.get(`/recommendation/${userId}`),
  getAllRecommendations: (): Promise<any> => apiClient.get('/recommendation/all'),
  getRecommendationByResultId: (resultId: string): Promise<any> => apiClient.get(`/recommendation/result/${resultId}`),
};

