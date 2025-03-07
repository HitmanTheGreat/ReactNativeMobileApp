import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest, putRequest, getRequest, deleteRequest } from "@/constants/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "/crops/"; // Adjust this based on your backend endpoint

export interface Crop {
    id: number;
    name: string;
    type: string;
    description: string;
}

// Utility function to save data to local storage
const saveToLocalStorage = async (data: Crop[]) => {
    await AsyncStorage.setItem('crops', JSON.stringify(data));
}

// Utility function to get data from local storage
const getFromLocalStorage = async (): Promise<Crop[] | null> => {
    const savedCrops = await AsyncStorage.getItem('crops');
    return savedCrops ? JSON.parse(savedCrops) : null;
}

// Thunks for Crop

// Fetch all crops (with offline support)
export const fetchCrops = createAsyncThunk<Crop[], void, { rejectValue: string }>(
    "crop/fetchAll",
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
                const savedCrops = await getFromLocalStorage();
                if (savedCrops) {
                    return savedCrops;
                } else {
                    return rejectWithValue("No crops available, even offline.");
                }
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch crops");
        }
    }
);

// Create a new crop
export const createCrop = createAsyncThunk<Crop, Partial<Crop>, { rejectValue: string }>(
    "crop/add",
    async (cropData, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                const response = await postRequest(API_URL, cropData, token);
                const savedCrops = await getFromLocalStorage() || [];
                savedCrops.push(response);
                await saveToLocalStorage(savedCrops);
                return response;
            } else {
                const savedCrops = await getFromLocalStorage() || [];
                const newCrop = { id: Date.now(), ...cropData }; // Assign a unique ID
                savedCrops.push(newCrop);
                await saveToLocalStorage(savedCrops);
                return newCrop;
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to add crop");
        }
    }
);

// Update an existing crop
export const updateCrop = createAsyncThunk<Crop, Crop, { rejectValue: string }>(
    "crop/update",
    async (updatedCrop, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                const response = await putRequest(`${API_URL}${updatedCrop.id}`, updatedCrop, token);
                const savedCrops = await getFromLocalStorage();
                if (savedCrops) {
                    const updatedCrops = savedCrops.map(crop =>
                        crop.id === updatedCrop.id ? response : crop
                    );
                    await saveToLocalStorage(updatedCrops);
                }
                return response;
            } else {
                const savedCrops = await getFromLocalStorage() || [];
                const updatedCrops = savedCrops.map(crop =>
                    crop.id === updatedCrop.id ? updatedCrop : crop
                );
                await saveToLocalStorage(updatedCrops);
                return updatedCrop;
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to update crop");
        }
    }
);

// Delete a crop by ID
export const deleteCrop = createAsyncThunk<number, number, { rejectValue: string }>(
    "crop/delete",
    async (cropId, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                await deleteRequest(`${API_URL}${cropId}`, token);
                const savedCrops = await getFromLocalStorage();
                if (savedCrops) {
                    const filteredCrops = savedCrops.filter(crop => crop.id !== cropId);
                    await saveToLocalStorage(filteredCrops);
                }
                return cropId;
            } else {
                const savedCrops = await getFromLocalStorage() || [];
                const filteredCrops = savedCrops.filter(crop => crop.id !== cropId);
                await saveToLocalStorage(filteredCrops);
                return cropId;
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete crop");
        }
    }
);
