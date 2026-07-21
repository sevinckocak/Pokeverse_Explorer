import { createSlice } from '@reduxjs/toolkit';
import type { Evolution } from '@/types';
import { fetchEvolution } from '@/store/evolution/evolutionThunks';

export type EvolutionRequestStatus = 'loading' | 'succeeded' | 'failed';

export interface EvolutionCacheEntry {
  status: EvolutionRequestStatus;
  data: Evolution | null;
  error: string | null;
}

export interface EvolutionState {
  // Cache of evolution chains already fetched this session, keyed by
  // evolutionChainId — this is what lets reopening the Evolution section
  // (for the same or a different Pokemon already visited) render instantly
  // with no new request.
  byChainId: Record<number, EvolutionCacheEntry>;
}

const initialState: EvolutionState = {
  byChainId: {},
};

const evolutionSlice = createSlice({
  name: 'evolution',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvolution.pending, (state, action) => {
        state.byChainId[action.meta.arg] = { status: 'loading', data: null, error: null };
      })
      .addCase(fetchEvolution.fulfilled, (state, action) => {
        state.byChainId[action.meta.arg] = {
          status: 'succeeded',
          data: action.payload,
          error: null,
        };
      })
      .addCase(fetchEvolution.rejected, (state, action) => {
        state.byChainId[action.meta.arg] = {
          status: 'failed',
          data: null,
          error: action.error.message ?? 'Failed to fetch evolution chain',
        };
      });
  },
});

export default evolutionSlice.reducer;
