// src/services/auth.js

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  // Here you should implement the logic to check if the user is authenticated
  // For simplicity, let's use localStorage to simulate authentication state
  return localStorage.getItem("token") !== null;
};

// Function to log in the user (save the token in localStorage)
export const login = (token) => {
  localStorage.setItem("token", token);
};

// Function to log out the user (remove the token from localStorage)
export const logout = () => {
  localStorage.removeItem("token");
};
