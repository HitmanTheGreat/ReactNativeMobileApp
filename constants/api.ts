import axios, { AxiosRequestConfig, AxiosError } from "axios";

// Default base URL for the Django API
export const BASE_URL = "http://127.0.0.1:8000/api";

// Define the types for the request data and token
interface RequestData {
    [key: string]: any;
}

interface AxiosResponse {
    data: any;
}

// Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to handle requests with Bearer token
const handleRequest = async (
    method: "POST" | "PUT" | "PATCH" | "GET" | "DELETE",
    endpoint: string,
    token: string | null,
    data: RequestData = {}
): Promise<AxiosResponse["data"]> => {
    try {
        const config: AxiosRequestConfig = {
            headers: token
                ? { Authorization: `Bearer ${token}` } // Add Authorization header only if token exists
                : {},
        };

        let response;

        switch (method.toUpperCase()) {
            case "POST":
                response = await axiosInstance.post(endpoint, data, config);
                break;
            case "PUT":
                response = await axiosInstance.put(endpoint, data, config);
                break;
            case "PATCH":
                response = await axiosInstance.patch(endpoint, data, config);
                break;
            case "GET":
                response = await axiosInstance.get(endpoint, { ...config, params: data });
                break;
            case "DELETE":
                response = await axiosInstance.delete(endpoint, { ...config, data });
                break;
            default:
                throw new Error("Invalid method");
        }

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("API request failed:", axiosError.response?.data || error);
        throw error;
    }
};

// Export functions for POST, PUT, PATCH, GET, DELETE, with token passed in as argument
export const postRequest = (endpoint: string, data: RequestData, token: string | null) =>
    handleRequest("POST", endpoint, token, data);

export const putRequest = (endpoint: string, data: RequestData, token: string | null) =>
    handleRequest("PUT", endpoint, token, data);

export const patchRequest = (endpoint: string, data: RequestData, token: string | null) =>
    handleRequest("PATCH", endpoint, token, data);

export const getRequest = (endpoint: string, params: RequestData, token: string | null) =>
    handleRequest("GET", endpoint, token, params);

export const deleteRequest = (endpoint: string, data: RequestData = {}, token: string | null) =>
    handleRequest("DELETE", endpoint, token, data);
