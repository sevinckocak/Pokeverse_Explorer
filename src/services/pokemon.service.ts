import api from '@/api/axios';
import type { RawPokemonResponse } from '@/types/api/RawPokemonResponse';
import type { RawPokemonListResponse } from '@/types/api/RawPokemonListResponse';
import type { PokemonDetail } from '@/types/domain/PokemonDetail';
import type { PokemonListResponse } from '@/types/domain/PokemonListItem';
import { mapToPokemonListItem } from '@/mappers';

export async function getPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> {
  const response = await api.get<RawPokemonListResponse>('/pokemon', {
    params: { limit, offset },
  });

  return {
    count: response.data.count,
    next: response.data.next,
    previous: response.data.previous,
    results: response.data.results.map(mapToPokemonListItem),
  };
}

// Builds a fresh domain object from the raw response so Redux only ever
// stores the handful of fields the app actually uses, in a shape that owes
// nothing to PokeAPI's structure — never the full PokeAPI payload (moves,
// forms, stats, game indices, held items, ...), never its snake_case
// naming, and never its nested `sprites.other["official-artwork"]` /
// `type: { name }` / `ability: { name }` wrapper objects.
function mapToPokemonDetail(raw: RawPokemonResponse): PokemonDetail {
  return {
    id: raw.id,
    name: raw.name,
    baseExperience: raw.base_experience,
    height: raw.height,
    weight: raw.weight,
    thumbnail: raw.sprites.front_default,
    artwork: raw.sprites.other?.['official-artwork']?.front_default ?? null,
    types: raw.types.map((entry) => entry.type.name),
    abilities: raw.abilities.map((entry) => ({
      name: entry.ability.name,
      isHidden: entry.is_hidden,
    })),
    stats: raw.stats.map((entry) => ({
      name: entry.stat.name,
      value: entry.base_stat,
    })),
  };
}

export async function getPokemonByNameOrId(
  nameOrId: string | number
): Promise<PokemonDetail> {
  const response = await api.get<RawPokemonResponse>(`/pokemon/${nameOrId}`);
  return mapToPokemonDetail(response.data);
}
