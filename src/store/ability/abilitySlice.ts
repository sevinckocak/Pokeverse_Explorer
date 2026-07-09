import { createSlice } from '@reduxjs/toolkit';
import type { Ability } from '@/types';
import { fetchAbility } from '@/store/ability/abilityThunks';

export interface AbilityState {
  abilities: Ability[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AbilityState = {
  abilities: [],
  isLoading: false,
  error: null,
};

const abilitySlice = createSlice({
  name: 'ability',
  initialState,
  reducers: {
    clearAbilities: (state) => {
      state.abilities = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbility.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAbility.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const exists = state.abilities.some(
          (ability) => ability.name === action.payload.name
        );

        if (!exists) {
          state.abilities.push(action.payload);
        }
      })
      .addCase(fetchAbility.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ?? action.error.message ?? 'Failed to fetch ability';
      });
  },
});

export const { clearAbilities } = abilitySlice.actions;

export default abilitySlice.reducer;