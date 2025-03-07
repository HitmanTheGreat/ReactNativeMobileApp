import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest, putRequest, getRequest, deleteRequest } from "@/constants/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "/farmers/"; // Adjust this based on your backend endpoint

export interface Farmer {
    id: number;
    name: string;
    farmName: string;
    address: string;
    email: string;
}

// Utility function to save data to local storage
const saveToLocalStorage = async (data: Farmer[]) => {
    await AsyncStorage.setItem('farmers', JSON.stringify(data));
}

// Utility function to get data from local storage
const getFromLocalStorage = async (): Promise<Farmer[] | null> => {
    const savedFarmers = await AsyncStorage.getItem('farmers');
    return savedFarmers ? JSON.parse(savedFarmers) : null;
}

// Thunks for Farmer

// Fetch all farmers (with offline support)
export const fetchFarmers = createAsyncThunk<Farmer[], void, { rejectValue: string }>(
    "farmer/fetchAll",
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
                const savedFarmers = await getFromLocalStorage();
                if (savedFarmers) {
                    return savedFarmers;
                } else {
                    return rejectWithValue("No farmers available, even offline.");
                }
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch farmers");
        }
    }
);

// Create a new farmer
export const createFarmer = createAsyncThunk<Farmer, Partial<Farmer>, { rejectValue: string }>(
    "farmer/add",
    async (farmerData, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                const response = await postRequest(API_URL, farmerData, token);
                const savedFarmers = await getFromLocalStorage() || [];
                savedFarmers.push(response);
                await saveToLocalStorage(savedFarmers);
                return response;
            } else {
                const savedFarmers = await getFromLocalStorage() || [];
                const newFarmer = { id: Date.now(), ...farmerData }; // Assign a unique ID
                savedFarmers.push(newFarmer);
                await saveToLocalStorage(savedFarmers);
                return newFarmer;
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to add farmer");
        }
    }
);

// Update an existing farmer
export const updateFarmer = createAsyncThunk<Farmer, Farmer, { rejectValue: string }>(
    "farmer/update",
    async (updatedFarmer, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                const response = await putRequest(`${API_URL}${updatedFarmer.id}`, updatedFarmer, token);
                const savedFarmers = await getFromLocalStorage();
                if (savedFarmers) {
                    const updatedFarmers = savedFarmers.map(farmer =>
                        farmer.id === updatedFarmer.id ? response : farmer
                    );
                    await saveToLocalStorage(updatedFarmers);
                }
                return response;
            } else {
                const savedFarmers = await getFromLocalStorage() || [];
                const updatedFarmers = savedFarmers.map(farmer =>
                    farmer.id === updatedFarmer.id ? updatedFarmer : farmer
                );
                await saveToLocalStorage(updatedFarmers);
                return updatedFarmer;
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to update farmer");
        }
    }
);

// Delete a farmer by ID
export const deleteFarmer = createAsyncThunk<number, number, { rejectValue: string }>(
    "farmer/delete",
    async (farmerId, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                await deleteRequest(`${API_URL}${farmerId}`, token);
                const savedFarmers = await getFromLocalStorage();
                if (savedFarmers) {
                    const filteredFarmers = savedFarmers.filter(farmer => farmer.id !== farmerId);
                    await saveToLocalStorage(filteredFarmers);
                }
                return farmerId;
            } else {
                const savedFarmers = await getFromLocalStorage() || [];
                const filteredFarmers = savedFarmers.filter(farmer => farmer.id !== farmerId);
                await saveToLocalStorage(filteredFarmers);
                return farmerId;
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete farmer");
        }
    }
);
