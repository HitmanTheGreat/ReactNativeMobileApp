import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of the crop state
interface Crop {
    id: number;
    name: string;
}

interface CropState {
    data: Crop[];     // List of crops
    crop: Crop | null; // Selected crop (single crop)
    isLoading: boolean;
    error: string | null;
}

const initialState: CropState = {
    data: [],
    crop: null, // Initially no selected crop
    isLoading: false,
    error: null,
};

const cropSlice = createSlice({
    name: 'crop',
    initialState,
    reducers: {
        fetchCropsStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchCropsSuccess: (state, action: PayloadAction<Crop[]>) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        fetchCropsFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setSelectedCrop: (state, action: PayloadAction<Crop | null>) => {
            state.crop = action.payload; // Update the selected crop
        },
    },
});

export const { fetchCropsStart, fetchCropsSuccess, fetchCropsFailure, setSelectedCrop } = cropSlice.actions;
export default cropSlice.reducer;
