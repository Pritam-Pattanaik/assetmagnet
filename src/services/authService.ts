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
  // Login user (Mock implementation for demo)
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication - accept any credentials for demo
      // In production, this would validate against a real database
      const mockUser: User = {
        id: '1',
        name: email.includes('admin') ? 'Admin User' : 'Demo User',
        email: email,
        role: email.includes('admin') ? 'admin' : 'student',
        avatar: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      return {
        user: mockUser,
        token: mockToken
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  },

  // Register user (Mock implementation for demo)
  register: async (name: string, email: string, password: string, role: string = 'student'): Promise<RegisterResponse> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock registration - accept any data for demo
      const mockUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        role: role as 'admin' | 'editor' | 'student' | 'applicant',
        avatar: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      return {
        user: mockUser,
        token: mockToken
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Registration failed');
    }
  },

  // Get current user (Mock implementation for demo)
  getCurrentUser: async (): Promise<User> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Get user data from localStorage (mock implementation)
      const userData = localStorage.getItem('user');
      if (!userData) {
        throw new Error('No user data found');
      }

      const user: User = JSON.parse(userData);
      return user;
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
    localStorage.removeItem('token');
  },
};
