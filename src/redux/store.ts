import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './pokemonApi'; // Import your API slice
import pokemonReducer from './pokemonSlice'; // Import your custom slice

export const store = configureStore({
    reducer: {
        pokemon: pokemonReducer, // Add your custom slice
        [pokemonApi.reducerPath]: pokemonApi.reducer, // Add the RTK Query API reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware), // Add RTK Query middleware
});

// TypeScript-specific types for the Redux store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
