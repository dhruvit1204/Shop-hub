// API configuration for the application

// Base URL for all API calls
export const API_BASE_URL = 'http://localhost:5001/api';

// Auth endpoints
export const AUTH_ENDPOINTS = {
  SEND_OTP: `${API_BASE_URL}/auth/send-otp`,
  VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
  GET_USER: `${API_BASE_URL}/auth/me`,
  SIGNUP: `${API_BASE_URL}/auth/signup`, // Added for password-based signup
  LOGIN: `${API_BASE_URL}/auth/login`,   // Added for password-based login
  REGISTER: `${API_BASE_URL}/auth/register`, // Added for compatibility with backend
};

// Helper function to get auth headers with token
export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};
