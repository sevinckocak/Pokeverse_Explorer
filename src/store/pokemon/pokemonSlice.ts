import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPokemonByNameOrId, getPokemonList } from '@/services';
import type { PokemonDetail, PokemonListItem } from '@/types';

export interface PokemonState {
  pokemonList: PokemonListItem[];
  loading: boolean;
  error: string | null;
  detail: PokemonDetail | null;
  loadingDetail: boolean;
  detailError: string | null;
}

const initialState: PokemonState = {
  pokemonList: [],
  loading: false,
  error: null,
  detail: null,
  loadingDetail: false,
  detailError: null,
};

export const fetchPokemonList = createAsyncThunk<
  PokemonListItem[],
  { limit?: number; offset?: number } | undefined
>('pokemon/fetchPokemonList', async (params) => {
  const { limit = 20, offset = 0 } = params ?? {};
  const response = await getPokemonList(limit, offset);
  return response.results;
});

export const fetchPokemonDetail = createAsyncThunk<PokemonDetail, string>(
  'pokemon/fetchPokemonDetail',
  async (name) => {
    return getPokemonByNameOrId(name);
  }
);

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
      })
      .addCase(fetchPokemonDetail.pending, (state) => {
        state.loadingDetail = true;
        state.detailError = null;
      })
      .addCase(fetchPokemonDetail.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.detail = action.payload;
      })
      .addCase(fetchPokemonDetail.rejected, (state, action) => {
        state.loadingDetail = false;
        state.detailError = action.error.message ?? 'Failed to fetch Pokémon detail';
      });
  },
});

export const { clearPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
