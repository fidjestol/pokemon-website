import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  selectedPokemon: number | null;
  columns: {
    picture: boolean;
    weight: boolean;
    height: boolean;
    types: boolean;
  };
}

// Helper function to load column settings from localStorage
const loadColumnsFromLocalStorage = () => {
  const savedColumns = localStorage.getItem('pokemon_columns');
  if (savedColumns) {
    return JSON.parse(savedColumns);
  }
  return {
    picture: true,
    weight: true,
    height: true,
    types: true,
  }; // Default settings if none are saved
};

// Helper function to save column settings to localStorage
const saveColumnsToLocalStorage = (columns: PokemonState['columns']) => {
  localStorage.setItem('pokemon_columns', JSON.stringify(columns));
};

const initialState: PokemonState = {
  selectedPokemon: null,
  columns: loadColumnsFromLocalStorage(), // Load columns from localStorage
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSelectedPokemon(state, action) {
      state.selectedPokemon = action.payload;
    },
    toggleColumn(state, action: PayloadAction<keyof PokemonState['columns']>) {
        const columnName = action.payload; // Now TypeScript knows this is a valid column key
        state.columns[columnName] = !state.columns[columnName]; // Safely toggle column visibility
      saveColumnsToLocalStorage(state.columns); // Save the updated column settings

    },
  },
});

export const { setSelectedPokemon, toggleColumn } = pokemonSlice.actions;

export default pokemonSlice.reducer;
