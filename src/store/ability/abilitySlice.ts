import { createSlice } from '@reduxjs/toolkit';
import type { Ability } from '@/types';
import { fetchAbility } from '@/store/ability/abilityThunks';

export interface AbilityState {
  abilities: Ability[];
  isLoading: boolean;
  error: string | null;
  requestCount: number;
}

const initialState: AbilityState = {
  abilities: [],
  isLoading: false,
  error: null,
  requestCount: 0,
};

function decrementRequestCount(state: AbilityState): void {
  state.requestCount = Math.max(0, state.requestCount - 1);
  state.isLoading = state.requestCount > 0;
}

const abilitySlice = createSlice({
  name: 'ability',
  initialState,
  reducers: {
    clearAbilities: (state) => {
      state.abilities = [];
      state.error = null;
      state.requestCount = 0;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbility.pending, (state) => {
        state.requestCount += 1;
        state.isLoading = state.requestCount > 0;
        state.error = null;
      })
      .addCase(fetchAbility.fulfilled, (state, action) => {
        decrementRequestCount(state);
        state.error = null;

        const exists = state.abilities.some(
          (ability) => ability.name === action.payload.name
        );

        if (!exists) {
          state.abilities.push(action.payload);
        }
      })
      .addCase(fetchAbility.rejected, (state, action) => {
        decrementRequestCount(state);
        state.error =
          action.payload ?? action.error.message ?? 'Failed to fetch ability';
      });
  },
});

export const { clearAbilities } = abilitySlice.actions;

export default abilitySlice.reducer;
