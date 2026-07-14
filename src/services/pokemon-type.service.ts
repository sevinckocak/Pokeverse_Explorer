import api from '@/api/axios';
import type { PokemonTypeDetail } from '@/types';

export async function getPokemonType(typeName: string): Promise<PokemonTypeDetail> {
  const response = await api.get<PokemonTypeDetail>(`/type/${typeName}`);
  return response.data;
}
