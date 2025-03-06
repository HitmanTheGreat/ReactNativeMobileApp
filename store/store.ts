import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your reducers
import userReducer from './slices/userSlice';
import networkReducer from './slices/networkSlice';
import farmTypeReducer from './slices/farmTypeSlice';
import cropReducer from './slices/cropSlice';
import farmerReducer from './slices/farmerSlice';
import userListReducer from './slices/usersSlice';

// Persist Config
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user', 'farmTypes', 'crops', 'farmers', 'users'], // Persist these slices
};

// Root Reducer combining all slices
const rootReducer = combineReducers({
    user: persistReducer(persistConfig, userReducer),
    network: networkReducer,
    farmType: persistReducer(persistConfig, farmTypeReducer),
    crops: persistReducer(persistConfig, cropReducer),
    farmer: persistReducer(persistConfig, farmerReducer),
    users: persistReducer(persistConfig, userListReducer),
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
