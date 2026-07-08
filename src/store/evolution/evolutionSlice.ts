import { createSlice } from '@reduxjs/toolkit';
import type { EvolutionChain } from '@/types';
import { fetchEvolutionChain } from '@/store/evolution/evolutionThunks';

export interface EvolutionState {
  evolutionChain: EvolutionChain | null;
  loading: boolean;
  error: string | null;
}

const initialState: EvolutionState = {
  evolutionChain: null,
  loading: false,
  error: null,
};

const evolutionSlice = createSlice({
  name: 'evolution',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvolutionChain.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.evolutionChain = null;
      })
      .addCase(fetchEvolutionChain.fulfilled, (state, action) => {
        state.loading = false;
        state.evolutionChain = action.payload;
      })
      .addCase(fetchEvolutionChain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch evolution chain';
      });
  },
});

export default evolutionSlice.reducer;
