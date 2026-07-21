import api from '@/api/axios';
import type { RawPokemonTypeResponse } from '@/types/api/RawPokemonTypeResponse';
import type { PokemonListItem } from '@/types/domain/PokemonListItem';
import { mapToPokemonListItem } from '@/mappers';

export async function getPokemonType(typeName: string): Promise<PokemonListItem[]> {
  const response = await api.get<RawPokemonTypeResponse>(`/type/${typeName}`);
  return response.data.pokemon.map((member) => mapToPokemonListItem(member.pokemon));
}
