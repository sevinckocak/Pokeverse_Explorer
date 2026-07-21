// Deliberately no `url` — the id is resolved from the raw API url once,
// inside the mapping layer, so no component ever needs to parse a URL to
// know which Pokemon it's rendering. `id` stays nullable only to preserve
// the pre-existing graceful fallback for an unparseable url (see
// `extractPokemonIdFromUrl`); in practice PokeAPI always sends a well-formed
// one.
export interface PokemonListItem {
  id: number | null;
  name: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}
