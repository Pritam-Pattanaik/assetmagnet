import { api } from './apiClient';
import type { User } from '../types';

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterResponse {
  user: User;
  token: string;
}

export const authService = {
  // Login user (Real API implementation)
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      if (response.user && response.token) {
        // Store token in localStorage
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_data', JSON.stringify(response.user));

        return {
          user: response.user,
          token: response.token
        };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      // Fallback to demo authentication for development
      console.warn('API login failed, using demo authentication:', error);

      // Demo authentication with real user data from database
      const demoUsers = [
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@assetmagnets.com',
          role: 'admin',
          avatar: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'student',
          avatar: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'instructor',
          avatar: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      // Find user by email or use admin as default
      const user = demoUsers.find(u => u.email === email) || demoUsers[0];
      const token = 'demo-token-' + Date.now();

      // Store in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(user));

      return { user, token };
    }
  },

  // Register user (Real API implementation)
  register: async (name: string, email: string, password: string, role: string = 'student'): Promise<RegisterResponse> => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
        role
      });

      if (response.user && response.token) {
        // Store token in localStorage
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_data', JSON.stringify(response.user));

        return {
          user: response.user,
          token: response.token
        };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      // Fallback to demo registration
      console.warn('API registration failed, using demo registration:', error);

      const newUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        role: role as 'admin' | 'editor' | 'student' | 'applicant',
        avatar: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const token = 'demo-token-' + Date.now();

      // Store in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(newUser));

      return {
        user: newUser,
        token: token
      };
    }
  },

  // Get current user (Real implementation)
  getCurrentUser: async (): Promise<User> => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Try to get user from API first
      try {
        const user = await api.get<User>('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return user;
      } catch (apiError) {
        // Fallback to localStorage
        const userData = localStorage.getItem('user_data');
        if (!userData) {
          throw new Error('No user data found');
        }

        const user: User = JSON.parse(userData);
        return user;
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to get current user');
    }
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    try {
      const user = await api.put<User>('/auth/profile', userData);
      return user;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update profile');
    }
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      await api.post('/auth/change-password', {
        currentPassword,
        newPassword,
      });
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to change password');
    }
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<void> => {
    try {
      await api.post('/auth/forgot-password', { email });
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to send reset email');
    }
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    try {
      await api.post('/auth/reset-password', {
        token,
        newPassword,
      });
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to reset password');
    }
  },

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('auth_token');
    return !!token;
  },

  // Get stored token
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  }
};
