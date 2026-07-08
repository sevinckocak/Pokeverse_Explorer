import { createSlice } from '@reduxjs/toolkit';
import type { PokemonDetail, PokemonListItem } from '@/types';
import { fetchPokemonDetail, fetchPokemonList } from '@/store/pokemon/pokemonThunks';

export interface PokemonState {
  pokemonList: PokemonListItem[];
  detail: PokemonDetail | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemonList: [],
  detail: null,
  isLoading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    clearPokemon: (state) => {
      state.pokemonList = [];
      state.detail = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pokemonList = action.payload;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch Pokémon list';
      })
      .addCase(fetchPokemonDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.detail = null;
      })
      .addCase(fetchPokemonDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detail = action.payload;
      })
      .addCase(fetchPokemonDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch Pokémon detail';
      });
  },
});

export const { clearPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
