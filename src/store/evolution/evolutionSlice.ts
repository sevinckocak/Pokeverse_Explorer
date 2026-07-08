import { createSlice } from '@reduxjs/toolkit';
import type { EvolutionChain } from '@/types';
import { fetchEvolutionChain } from '@/store/evolution/evolutionThunks';

export interface EvolutionState {
  evolutionChain: EvolutionChain | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: EvolutionState = {
  evolutionChain: null,
  isLoading: false,
  error: null,
};

const evolutionSlice = createSlice({
  name: 'evolution',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvolutionChain.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.evolutionChain = null;
      })
      .addCase(fetchEvolutionChain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.evolutionChain = action.payload;
      })
      .addCase(fetchEvolutionChain.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch evolution chain';
      });
  },
});

export default evolutionSlice.reducer;
