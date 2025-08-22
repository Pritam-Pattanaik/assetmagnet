import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState } from '../types';
import { authService } from '../services/authService';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ user: User; token: string; }>;
  register: (name: string, email: string, password: string, role?: string) => Promise<{ user: User; token: string; }>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for existing token on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');

      console.log('Initializing auth...', { token: !!token, userData: !!userData });

      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          console.log('Restored user from localStorage:', user);
          setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Error parsing user data:', error);
          // Invalid data, clear everything
          authService.logout();
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        console.log('No token or user data found, setting unauthenticated');
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Login attempt:', { email });
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const { user, token } = await authService.login(email, password);
      console.log('Login successful:', { user, token });
      // Token and user data are already stored in authService.login
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
      console.log('Auth state updated, user role:', user.role);
      return { user, token };
    } catch (error) {
      console.error('Login failed:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: string = 'student') => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const { user, token } = await authService.register(name, email, password, role);
      // Token and user data are already stored in authService.register
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
      return { user, token };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    console.log('Logging out user');
    authService.logout();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (authState.user) {
      setAuthState(prev => ({
        ...prev,
        user: { ...prev.user!, ...userData },
      }));
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
