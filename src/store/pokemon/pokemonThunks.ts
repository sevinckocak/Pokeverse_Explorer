import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemonByNameOrId, getPokemonList } from '@/services';
import type { PokemonDetail, PokemonListItem } from '@/types';

export const DEFAULT_POKEMON_PAGE_SIZE = 20;

export interface FetchPokemonListParams {
  limit?: number;
  offset?: number;
}

export interface FetchPokemonListResult {
  results: PokemonListItem[];
  hasMore: boolean;
}

export const fetchPokemonList = createAsyncThunk<
  FetchPokemonListResult,
  FetchPokemonListParams | undefined
>('pokemon/fetchPokemonList', async (params) => {
  const { limit = DEFAULT_POKEMON_PAGE_SIZE, offset = 0 } = params ?? {};
  const response = await getPokemonList(limit, offset);
  return { results: response.results, hasMore: response.next !== null };
});

export const fetchPokemonDetail = createAsyncThunk<PokemonDetail, string>(
  'pokemon/fetchPokemonDetail',
  async (name) => {
    return getPokemonByNameOrId(name);
  }
);
