import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

export const selectPokemonState = (state: RootState) => state.pokemon;

export const selectPokemonList = createSelector(
  selectPokemonState,
  (pokemonState) => pokemonState.pokemonList
);

export const selectPokemonDetail = createSelector(
  selectPokemonState,
  (pokemonState) => pokemonState.detail
);

export const selectPokemonLoading = createSelector(
  selectPokemonState,
  (pokemonState) => pokemonState.isLoading
);

export const selectPokemonError = createSelector(
  selectPokemonState,
  (pokemonState) => pokemonState.error
);
