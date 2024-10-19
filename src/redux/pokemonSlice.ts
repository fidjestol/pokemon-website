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

const initialState: PokemonState = {
  selectedPokemon: null,
  columns: {
    picture: true,
    weight: true,
    height: true,
    types: true,
  },
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
      },
  },
});

export const { setSelectedPokemon, toggleColumn } = pokemonSlice.actions;

export default pokemonSlice.reducer;
