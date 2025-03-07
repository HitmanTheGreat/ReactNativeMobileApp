import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest, putRequest, getRequest, deleteRequest } from "@/constants/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "/users/"; // Adjust this based on your backend endpoint

export interface User {
    id: number;
    username: string;
    email: string;
    fullName: string;
    role: string;
}

// Utility function to save data to local storage
const saveToLocalStorage = async (data: User[]) => {
    await AsyncStorage.setItem('users', JSON.stringify(data));
}

// Utility function to get data from local storage
const getFromLocalStorage = async (): Promise<User[] | null> => {
    const savedUsers = await AsyncStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : null;
}

// Thunks for User

// Fetch all users (with offline support)
export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    "user/fetchAll",
    async (_, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                const response = await getRequest(API_URL, {}, token);
                await saveToLocalStorage(response);
                return response;
            } else {
                const savedUsers = await getFromLocalStorage();
                if (savedUsers) {
                    return savedUsers;
                } else {
                    return rejectWithValue("No users available, even offline.");
                }
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch users");
        }
    }
);

// Create a new user
export const createUser = createAsyncThunk<User, Partial<User>, { rejectValue: string }>(
    "user/add",
    async (userData, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                const response = await postRequest(API_URL, userData, token);
                const savedUsers = await getFromLocalStorage() || [];
                savedUsers.push(response);
                await saveToLocalStorage(savedUsers);
                return response;
            } else {
                const savedUsers = await getFromLocalStorage() || [];
                const newUser = { id: Date.now(), ...userData }; // Assign a unique ID
                savedUsers.push(newUser);
                await saveToLocalStorage(savedUsers);
                return newUser;
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to add user");
        }
    }
);

// Update an existing user
export const updateUser = createAsyncThunk<User, User, { rejectValue: string }>(
    "user/update",
    async (updatedUser, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                const response = await putRequest(`${API_URL}${updatedUser.id}`, updatedUser, token);
                const savedUsers = await getFromLocalStorage();
                if (savedUsers) {
                    const updatedUsers = savedUsers.map(user =>
                        user.id === updatedUser.id ? response : user
                    );
                    await saveToLocalStorage(updatedUsers);
                }
                return response;
            } else {
                const savedUsers = await getFromLocalStorage() || [];
                const updatedUsers = savedUsers.map(user =>
                    user.id === updatedUser.id ? updatedUser : user
                );
                await saveToLocalStorage(updatedUsers);
                return updatedUser;
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to update user");
        }
    }
);

// Delete a user by ID
export const deleteUser = createAsyncThunk<number, number, { rejectValue: string }>(
    "user/delete",
    async (userId, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                await deleteRequest(`${API_URL}${userId}`, token);
                const savedUsers = await getFromLocalStorage();
                if (savedUsers) {
                    const filteredUsers = savedUsers.filter(user => user.id !== userId);
                    await saveToLocalStorage(filteredUsers);
                }
                return userId;
            } else {
                const savedUsers = await getFromLocalStorage() || [];
                const filteredUsers = savedUsers.filter(user => user.id !== userId);
                await saveToLocalStorage(filteredUsers);
                return userId;
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete user");
        }
    }
);
