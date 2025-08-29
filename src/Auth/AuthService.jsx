// src/services/AuthService.js

const TOKEN_KEY = "token";

export const AuthService = {
  saveToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token); // you can use sessionStorage if preferred
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  }
};
