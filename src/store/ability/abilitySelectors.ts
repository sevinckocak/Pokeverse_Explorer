import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

export const selectAbilityState = (state: RootState) => state.ability;

export const selectAbilityEntry = (name: string) =>
  createSelector(selectAbilityState, (abilityState) => abilityState.byName[name] ?? null);
