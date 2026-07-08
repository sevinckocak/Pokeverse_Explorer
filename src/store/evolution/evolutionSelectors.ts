import type { RootState } from '@/store/store';

export const selectEvolutionChain = (state: RootState) => state.evolution.evolutionChain;
export const selectEvolutionLoading = (state: RootState) => state.evolution.isLoading;
export const selectEvolutionError = (state: RootState) => state.evolution.error;
