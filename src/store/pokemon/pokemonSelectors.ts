import type { RootState } from '@/store/store';

export const selectPokemonList = (state: RootState) => state.pokemon.pokemonList;
export const selectPokemonDetail = (state: RootState) => state.pokemon.detail;
export const selectPokemonLoading = (state: RootState) => state.pokemon.isLoading;
export const selectPokemonError = (state: RootState) => state.pokemon.error;
