import { createSlice } from "@reduxjs/toolkit";
import { fetchFarmTypes, createFarmType, updateFarmType, deleteFarmType, FarmType } from "@/store/thunks/farmTypeThunk";

interface FarmTypeState {
    data: FarmType[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: FarmTypeState = {
    data: [],
    status: "idle",
    error: null,
};

const farmTypeSlice = createSlice({
    name: "farmType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFarmTypes.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchFarmTypes.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchFarmTypes.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(createFarmType.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createFarmType.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data.push(action.payload);
            })
            .addCase(createFarmType.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(updateFarmType.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateFarmType.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.data.findIndex(farm => farm.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(updateFarmType.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(deleteFarmType.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteFarmType.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = state.data.filter(farm => farm.id !== action.payload);
            })
            .addCase(deleteFarmType.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export default farmTypeSlice.reducer;
