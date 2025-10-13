import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or sessionStorage
    if (token) {
      config.headers.Authorization = token; // or `Bearer ${token}` if your backend expects that
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
