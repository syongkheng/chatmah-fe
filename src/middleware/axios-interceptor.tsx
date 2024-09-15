import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL, // Replace with your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from session storage
    const token = sessionStorage.getItem('jwt');

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Disable console.error for Axios request errors
axiosInstance.interceptors.response.use(
  response => {
    // If the response is successful, return it unchanged
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);


export default axiosInstance;
