import api from '@/api/axios';
import type { PokemonListResponse } from '@/types';

export async function getPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> {
  const response = await api.get<PokemonListResponse>('/pokemon', {
    params: { limit, offset },
  });
  return response.data;
}

export async function getPokemonByNameOrId(
  nameOrId: string | number
): Promise<unknown> {
  const response = await api.get(`/pokemon/${nameOrId}`);
  return response.data;
}
