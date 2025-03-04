import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './slices/userSlice';

// Persist Config
const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // Use AsyncStorage for persistence
    whitelist: ['user'], // Only persist the user state
};

// Root Reducer
const rootReducer = combineReducers({
    user: persistReducer(persistConfig, userReducer), // Apply persistReducer to user reducer
});

// Store Configuration
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check for redux-persist
        }),
});

// Persistor
export const persistor = persistStore(store);

// Define RootState and AppDispatch Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
