import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest, putRequest, patchRequest, getRequest, deleteRequest }  from "@/constants/api";

const API_URL = "/farm-types/"; // Adjust this based on your backend endpoint

// Define FarmType interface
export interface FarmType {
    id: number;
    name: string;
    description: string;
}

// Thunks
export const fetchFarmTypes = createAsyncThunk<FarmType[], void, { rejectValue: string }>(
    "farmType/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getRequest(API_URL, {}, null);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch farm types");
        }
    }
);

export const createFarmType = createAsyncThunk<FarmType, Partial<FarmType>, { rejectValue: string }>(
    "farmType/create",
    async (farmTypeData, { rejectWithValue }) => {
        try {
            const response = await postRequest(API_URL, farmTypeData, null);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to create farm type");
        }
    }
);

export const updateFarmType = createAsyncThunk<FarmType, { id: number; farmTypeData: Partial<FarmType> }, { rejectValue: string }>(
    "farmType/update",
    async ({ id, farmTypeData }, { rejectWithValue }) => {
        try {
            const response = await putRequest(`${API_URL}/${id}`, farmTypeData, null);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to update farm type");
        }
    }
);

export const deleteFarmType = createAsyncThunk<number, number, { rejectValue: string }>(
    "farmType/delete",
    async (id, { rejectWithValue }) => {
        try {
            await deleteRequest(`${API_URL}/${id}`, {}, null);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete farm type");
        }
    }
);