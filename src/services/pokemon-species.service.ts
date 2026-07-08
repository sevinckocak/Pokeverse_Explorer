import api from '@/api/axios';
import type { PokemonSpecies } from '@/types';

export async function getPokemonSpecies(
  nameOrId: string | number
): Promise<PokemonSpecies> {
  const response = await api.get<PokemonSpecies>(`/pokemon-species/${nameOrId}`);
  return response.data;
}
