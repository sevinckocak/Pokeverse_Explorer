import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPokemonList } from '@/services';
import type { PokemonListItem } from '@/types';

export interface PokemonState {
  pokemonList: PokemonListItem[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemonList: [],
  loading: false,
  error: null,
};

export const fetchPokemonList = createAsyncThunk<
  PokemonListItem[],
  { limit?: number; offset?: number } | undefined
>('pokemon/fetchPokemonList', async (params) => {
  const { limit = 20, offset = 0 } = params ?? {};
  const response = await getPokemonList(limit, offset);
  return response.results;
});

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonList = action.payload;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch Pokémon list';
      });
  },
});

export const { clearPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
