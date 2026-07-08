import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

export const selectEvolutionState = (state: RootState) => state.evolution;

export const selectEvolutionChain = createSelector(
  selectEvolutionState,
  (evolutionState) => evolutionState.evolutionChain
);

export const selectEvolutionLoading = createSelector(
  selectEvolutionState,
  (evolutionState) => evolutionState.isLoading
);

export const selectEvolutionError = createSelector(
  selectEvolutionState,
  (evolutionState) => evolutionState.error
);
