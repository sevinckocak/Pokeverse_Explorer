import { createSlice } from '@reduxjs/toolkit';
import type { Ability } from '@/types';
import { fetchAbility } from '@/store/ability/abilityThunks';

export type AbilityRequestStatus = 'loading' | 'succeeded' | 'failed';

export interface AbilityCacheEntry {
  status: AbilityRequestStatus;
  data: Ability | null;
  error: string | null;
}

export interface AbilityState {
  // Cache keyed by ability name rather than by Pokemon — many Pokemon
  // share the same ability, so this doubles as a cross-Pokemon cache too.
  byName: Record<string, AbilityCacheEntry>;
}

const initialState: AbilityState = {
  byName: {},
};

const abilitySlice = createSlice({
  name: 'ability',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbility.pending, (state, action) => {
        state.byName[action.meta.arg] = { status: 'loading', data: null, error: null };
      })
      .addCase(fetchAbility.fulfilled, (state, action) => {
        state.byName[action.meta.arg] = {
          status: 'succeeded',
          data: action.payload,
          error: null,
        };
      })
      .addCase(fetchAbility.rejected, (state, action) => {
        state.byName[action.meta.arg] = {
          status: 'failed',
          data: null,
          error: action.error.message ?? 'Failed to fetch ability',
        };
      });
  },
});

export default abilitySlice.reducer;
