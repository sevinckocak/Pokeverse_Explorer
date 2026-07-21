import type { RawPokemonListItem } from '@/types/api/RawPokemonListResponse';

// Minimal typing of the PokeAPI `/type/{name}` response — only the member
// list `pokemon-type.service.ts` reads. The real response also includes
// damage relations and per-generation data; unused by the app today.
export interface RawPokemonTypeMember {
  pokemon: RawPokemonListItem;
}

export interface RawPokemonTypeResponse {
  pokemon: RawPokemonTypeMember[];
}
