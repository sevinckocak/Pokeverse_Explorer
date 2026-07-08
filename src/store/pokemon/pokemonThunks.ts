import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemonByNameOrId, getPokemonList } from '@/services';
import type { PokemonDetail, PokemonListItem } from '@/types';

export const fetchPokemonList = createAsyncThunk<
  PokemonListItem[],
  { limit?: number; offset?: number } | undefined
>('pokemon/fetchPokemonList', async (params) => {
  const { limit = 20, offset = 0 } = params ?? {};
  const response = await getPokemonList(limit, offset);
  return response.results;
});

export const fetchPokemonDetail = createAsyncThunk<PokemonDetail, string>(
  'pokemon/fetchPokemonDetail',
  async (name) => {
    return getPokemonByNameOrId(name);
  }
);
