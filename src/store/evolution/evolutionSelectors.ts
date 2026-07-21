import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

export const selectEvolutionState = (state: RootState) => state.evolution;

export const selectEvolutionEntry = (chainId: number | null) =>
  createSelector(selectEvolutionState, (evolutionState) =>
    chainId !== null ? (evolutionState.byChainId[chainId] ?? null) : null
  );
