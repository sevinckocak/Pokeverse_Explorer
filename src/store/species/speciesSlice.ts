import { createSlice } from '@reduxjs/toolkit';
import type { PokemonSpecies } from '@/types';
import { fetchPokemonSpecies } from '@/store/species/speciesThunks';

export interface SpeciesState {
  species: PokemonSpecies | null;
  loading: boolean;
  error: string | null;
}

const initialState: SpeciesState = {
  species: null,
  loading: false,
  error: null,
};

const speciesSlice = createSlice({
  name: 'species',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonSpecies.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.species = null;
      })
      .addCase(fetchPokemonSpecies.fulfilled, (state, action) => {
        state.loading = false;
        state.species = action.payload;
      })
      .addCase(fetchPokemonSpecies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch Pokémon species';
      });
  },
});

export default speciesSlice.reducer;
