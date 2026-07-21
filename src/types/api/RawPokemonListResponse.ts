// Minimal typing of the PokeAPI `/pokemon` (list) response item — just
// `{ name, url }`, exactly what PokeAPI sends for a list entry. The `url`
// only exists here, in the raw layer; `pokemonListItem.mapper.ts` resolves
// it into a numeric `id` before anything downstream ever sees it.
export interface RawPokemonListItem {
  name: string;
  url: string;
}

export interface RawPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawPokemonListItem[];
}
