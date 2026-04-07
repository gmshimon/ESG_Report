
import axios from "axios";

const prod = 'https://rick-and-morty-full-stack-app.vercel.app/api/'
const local = 'http://localhost:3002/'

// Create an Axios instance
const axiosSecure = axios.create({
  baseURL: local,
});

// Add a request interceptor to include the token in the headers
axiosSecure.interceptors.request.use(
  (config) => {
    // Retrieve the token from storage (e.g., localStorage or a variable)
     const token = localStorage.getItem('userToken');
    const {access_token} = JSON.parse(token)
    if (access_token) {
      // If a token exists, set it in the Authorization header
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    console.log("access_token from axiosSecure:", config.headers.Authorization);
    
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosSecure;