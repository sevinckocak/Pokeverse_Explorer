import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

export const selectSpeciesState = (state: RootState) => state.species;

export const selectPokemonSpecies = createSelector(
  selectSpeciesState,
  (speciesState) => speciesState.species
);

export const selectSpeciesLoading = createSelector(
  selectSpeciesState,
  (speciesState) => speciesState.isLoading
);

export const selectSpeciesError = createSelector(
  selectSpeciesState,
  (speciesState) => speciesState.error
);
