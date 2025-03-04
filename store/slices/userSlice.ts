import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of the user state
interface UserState {
    user: {
        access: string | null;
        refresh: string | null;
        username: string | null;
    } | null;
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Set user data including access, refresh tokens, and username
        setUser: (state, action: PayloadAction<{ access: string, refresh: string, username: string }>) => {
            state.user = action.payload;
        },
        // Logout and clear user data
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
