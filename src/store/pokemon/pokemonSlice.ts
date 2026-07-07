import { createSlice } from '@reduxjs/toolkit';

export interface PokemonState {
  pokemonList: unknown[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemonList: [],
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    clearPokemon: (state) => {
      state.pokemonList = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { clearPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
