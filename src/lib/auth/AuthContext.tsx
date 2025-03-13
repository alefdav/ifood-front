'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { 
  AuthContextType, 
  AuthState, 
  LoginCredentials, 
  RegisterData, 
  User 
} from './types';
import * as authService from './authService';

// Estado inicial
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Tipos de ações
type AuthAction = 
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'REGISTER_REQUEST' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_PROFILE_REQUEST' }
  | { type: 'UPDATE_PROFILE_SUCCESS'; payload: Partial<User> }
  | { type: 'UPDATE_PROFILE_FAILURE'; payload: string }
  | { type: 'INITIALIZE'; payload: User | null };

// Reducer para gerenciar o estado
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
    case 'UPDATE_PROFILE_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        error: null
      };
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user: state.user ? { ...state.user, ...action.payload } : null,
        error: null
      };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
    case 'UPDATE_PROFILE_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'INITIALIZE':
      return {
        ...state,
        isAuthenticated: !!action.payload,
        user: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}

// Criar o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar se o usuário já está autenticado ao carregar a página
  useEffect(() => {
    const initializeAuth = () => {
      const user = authService.getCurrentUser();
      dispatch({ type: 'INITIALIZE', payload: user });
    };

    initializeAuth();
  }, []);

  // Funções de autenticação
  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const { user } = await authService.login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error instanceof Error ? error.message : 'Erro ao fazer login' 
      });
    }
  };

  const register = async (data: RegisterData) => {
    dispatch({ type: 'REGISTER_REQUEST' });
    try {
      const { user } = await authService.register(data);
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ 
        type: 'REGISTER_FAILURE', 
        payload: error instanceof Error ? error.message : 'Erro ao registrar' 
      });
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const updateProfile = async (data: Partial<User>) => {
    dispatch({ type: 'UPDATE_PROFILE_REQUEST' });
    try {
      await authService.updateProfile(data);
      dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'UPDATE_PROFILE_FAILURE', payload: error instanceof Error ? error.message : 'Erro ao atualizar perfil' });
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
} 