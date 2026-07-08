import api from '@/api/axios';
import type { PokemonDetail, PokemonListResponse } from '@/types';

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
): Promise<PokemonDetail> {
  const response = await api.get<PokemonDetail>(`/pokemon/${nameOrId}`);
  return response.data;
}
