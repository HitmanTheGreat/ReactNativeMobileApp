import { createSlice } from "@reduxjs/toolkit";
import { fetchCrops, createCrop, updateCrop, deleteCrop, Crop } from "@/store/thunks/cropThunk";

interface CropState {
    data: Crop[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: CropState = {
    data: [],
    status: "idle",
    error: null,
};

const cropSlice = createSlice({
    name: "crop",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch crops actions
            .addCase(fetchCrops.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCrops.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchCrops.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            // Create crop actions
            .addCase(createCrop.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createCrop.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data.push(action.payload); // Add the newly created crop to the list
            })
            .addCase(createCrop.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            // Update crop actions
            .addCase(updateCrop.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateCrop.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.data.findIndex(crop => crop.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload; // Update the crop in the list
                }
            })
            .addCase(updateCrop.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            // Delete crop actions
            .addCase(deleteCrop.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteCrop.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = state.data.filter(crop => crop.id !== action.payload); // Remove the deleted crop
            })
            .addCase(deleteCrop.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export default cropSlice.reducer;
