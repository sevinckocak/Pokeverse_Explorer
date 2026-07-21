import type { RawPokemonListItem } from '@/types/api/RawPokemonListResponse';
import type { PokemonListItem } from '@/types/domain/PokemonListItem';
import { extractPokemonIdFromUrl } from '@/utils/pokemonAssets';

// Shared by both `pokemon.service.ts` (the paginated list) and
// `pokemon-type.service.ts` (a type's member list) — both endpoints send
// the same raw `{ name, url }` shape, so both map through this one function.
export function mapToPokemonListItem(raw: RawPokemonListItem): PokemonListItem {
  return {
    id: extractPokemonIdFromUrl(raw.url),
    name: raw.name,
  };
}
