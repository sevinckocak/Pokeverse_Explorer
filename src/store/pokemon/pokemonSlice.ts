import { createSlice } from '@reduxjs/toolkit';
import type { PokemonDetail, PokemonListItem } from '@/types';
import { fetchPokemonDetail, fetchPokemonList } from '@/store/pokemon/pokemonThunks';

export interface PokemonState {
  pokemonList: PokemonListItem[];
  detail: PokemonDetail | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemonList: [],
  detail: null,
  isLoading: false,
  isLoadingMore: false,
  hasMore: true,
  error: null,
};

function isLoadMoreRequest(offset: number | undefined): boolean {
  return (offset ?? 0) > 0;
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    clearPokemon: (state) => {
      state.pokemonList = [];
      state.detail = null;
      state.isLoading = false;
      state.isLoadingMore = false;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state, action) => {
        if (isLoadMoreRequest(action.meta.arg?.offset)) {
          state.isLoadingMore = true;
        } else {
          state.isLoading = true;
        }
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        state.hasMore = action.payload.hasMore;

        if (isLoadMoreRequest(action.meta.arg?.offset)) {
          const existingNames = new Set(state.pokemonList.map((item) => item.name));
          const newItems = action.payload.results.filter(
            (item) => !existingNames.has(item.name)
          );
          state.pokemonList.push(...newItems);
        } else {
          state.pokemonList = action.payload.results;
        }
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
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
