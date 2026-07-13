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

export const selectPokemonLoadingMore = createSelector(
  selectPokemonState,
  (pokemonState) => pokemonState.isLoadingMore
);

export const selectPokemonHasMore = createSelector(
  selectPokemonState,
  (pokemonState) => pokemonState.hasMore
);

export const selectPokemonError = createSelector(
  selectPokemonState,
  (pokemonState) => pokemonState.error
);
