import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest, putRequest, patchRequest, getRequest, deleteRequest } from "@/constants/api";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for local storage

const API_URL = "/farm-types/"; // Adjust this based on your backend endpoint

// Define FarmType interface
export interface FarmType {
    id: number;
    name: string;
    description: string;
}

// Utility function to save data to local storage
const saveToLocalStorage = async (data: FarmType[]) => {
    await AsyncStorage.setItem('farmTypes', JSON.stringify(data));
}

// Utility function to get data from local storage
const getFromLocalStorage = async (): Promise<FarmType[] | null> => {
    const savedFarmTypes = await AsyncStorage.getItem('farmTypes');
    return savedFarmTypes ? JSON.parse(savedFarmTypes) : null;
}



// Thunks
export const getFarmTypeById = createAsyncThunk<FarmType, number, { rejectValue: string }>(
    "farmType/getById",
    async (id, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                // If online, fetch farm type by id from API with token
                const response = await getRequest(`${API_URL}${id}/`, {}, token);
                return response;
            } else {
                // If offline, get the farm type from local storage
                const savedFarmTypes = await getFromLocalStorage();
                const farmType = savedFarmTypes?.find(farm => farm.id === id);
                if (farmType) {
                    return farmType;
                } else {
                    return rejectWithValue("Farm type not found in local storage.");
                }
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch farm type by id");
        }
    }
);


export const addFarmType = createAsyncThunk<FarmType, Partial<FarmType>, { rejectValue: string }>(
    "farmType/add",
    async (farmTypeData, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                // If online, add via API with token
                const response = await postRequest(API_URL, farmTypeData, token);
                // Add the new farm type to local storage
                const savedFarmTypes = await getFromLocalStorage() || [];
                savedFarmTypes.push(response);
                await saveToLocalStorage(savedFarmTypes);
                return response;
            } else {
                // If offline, simulate local addition (and save it for offline use)
                const savedFarmTypes = await getFromLocalStorage() || [];
                const newFarmType = { id: Date.now(), ...farmTypeData }; // Assign a unique ID
                savedFarmTypes.push(newFarmType);
                await saveToLocalStorage(savedFarmTypes);
                return newFarmType;
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to add farm type");
        }
    }
);


export const fetchFarmTypes = createAsyncThunk<FarmType[], void, { rejectValue: string }>(
    "farmType/fetchAll",
    async (_, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                // If online, fetch from API with token
                const response = await getRequest(API_URL, {}, token);
                // Save data to local storage for offline use
                await saveToLocalStorage(response);
                return response;
            } else {
                // If offline, get data from local storage
                const savedFarmTypes = await getFromLocalStorage();
                if (savedFarmTypes) {
                    return savedFarmTypes;
                } else {
                    return rejectWithValue("No farm types available, even offline.");
                }
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch farm types");
        }
    }
);

export const createFarmType = createAsyncThunk<FarmType, Partial<FarmType>, { rejectValue: string }>(
    "farmType/create",
    async (farmTypeData, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                // If online, create via API with token
                const response = await postRequest(API_URL, farmTypeData, token);
                // Add the new farm type to local storage
                const savedFarmTypes = await getFromLocalStorage() || [];
                savedFarmTypes.push(response);
                await saveToLocalStorage(savedFarmTypes);
                return response;
            } else {
                // If offline, simulate local creation (and save it for offline use)
                const savedFarmTypes = await getFromLocalStorage() || [];
                const newFarmType = { id: Date.now(), ...farmTypeData }; // Assign a unique ID
                savedFarmTypes.push(newFarmType);
                await saveToLocalStorage(savedFarmTypes);
                return newFarmType;
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to create farm type");
        }
    }
);

export const updateFarmType = createAsyncThunk<FarmType, { id: number; farmTypeData: Partial<FarmType> }, { rejectValue: string }>(
    "farmType/update",
    async ({ id, farmTypeData }, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                // If online, update via API with token
                const response = await putRequest(`${API_URL}/${id}`, farmTypeData, token);
                // Update the farm type in local storage
                const savedFarmTypes = await getFromLocalStorage();
                const updatedFarmTypes = savedFarmTypes?.map(farm => farm.id === id ? response : farm) || [];
                await saveToLocalStorage(updatedFarmTypes);
                return response;
            } else {
                // If offline, simulate local update (and save it for offline use)
                const savedFarmTypes = await getFromLocalStorage();
                const updatedFarmTypes = savedFarmTypes?.map(farm =>
                    farm.id === id ? { ...farm, ...farmTypeData } : farm
                ) || [];
                await saveToLocalStorage(updatedFarmTypes);
                return { ...farmTypeData, id };
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to update farm type");
        }
    }
);

export const deleteFarmType = createAsyncThunk<number, number, { rejectValue: string }>(
    "farmType/delete",
    async (id, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const isConnected = state.network.isConnected;
        const token = state.user.access;  // Access token from the state

        try {
            if (isConnected) {
                // If online, delete via API with token
                await deleteRequest(`${API_URL}/${id}`, {}, token);
                // Remove the farm type from local storage
                const savedFarmTypes = await getFromLocalStorage();
                const updatedFarmTypes = savedFarmTypes?.filter(farm => farm.id !== id) || [];
                await saveToLocalStorage(updatedFarmTypes);
                return id;
            } else {
                // If offline, simulate local delete (and save it for offline use)
                const savedFarmTypes = await getFromLocalStorage();
                const updatedFarmTypes = savedFarmTypes?.filter(farm => farm.id !== id) || [];
                await saveToLocalStorage(updatedFarmTypes);
                return id;
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete farm type");
        }
    }
);
