import { RootState, store } from '@/store/store';
import axios from 'axios';

// Replace with your actual base URL
const BASE_URL = 'http://127.0.0.1:8000/api';

// Create an Axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json', // Default content type
    },
});

// Function to get the Bearer token from Redux state
const getAuthToken = (): string | null => {
    const state = store.getState() as RootState; // Get the entire Redux state
    const token = state.user?.user?.token; // Assuming token is stored in user.user.token
    return token || null; // Return token or null if it's not available
};

// Add Authorization Header before each request
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken(); // Get token dynamically from Redux state
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Set the token in headers
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Generic function to handle GET requests
export const get = async (url: string, params = {}) => {
    try {
        const response = await api.get(url, { params });
        return response.data;
    } catch (error) {
        console.error('GET request failed', error);
        throw error;
    }
};

// Generic function to handle POST requests
export const post = async (url: string, data: any) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        console.error('POST request failed', error);
        throw error;
    }
};

// Generic function to handle PUT requests
export const put = async (url: string, data: any) => {
    try {
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        console.error('PUT request failed', error);
        throw error;
    }
};

// Generic function to handle PATCH requests
export const patch = async (url: string, data: any) => {
    try {
        const response = await api.patch(url, data);
        return response.data;
    } catch (error) {
        console.error('PATCH request failed', error);
        throw error;
    }
};

// Generic function to handle DELETE requests
export const remove = async (url: string, data = {}) => {
    try {
        const response = await api.delete(url, { data });
        return response.data;
    } catch (error) {
        console.error('DELETE request failed', error);
        throw error;
    }
};

export default api;
