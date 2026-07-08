import type { RootState } from '@/store/store';

export const selectPokemonSpecies = (state: RootState) => state.species.species;
export const selectSpeciesLoading = (state: RootState) => state.species.loading;
export const selectSpeciesError = (state: RootState) => state.species.error;
