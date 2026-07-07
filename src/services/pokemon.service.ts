import api from '@/api/axios';

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

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
