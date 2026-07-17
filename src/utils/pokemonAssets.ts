const POKEMON_DETAIL_URL_ID_PATTERN = /\/pokemon\/(\d+)\/?$/;

// PokemonListItem.url is the PokeAPI detail endpoint
// (e.g. "https://pokeapi.co/api/v2/pokemon/25/"), not an image URL — the id
// is the trailing path segment. Returns null instead of throwing so callers
// (list-rendered cards) can fall back to a placeholder rather than crash on
// an unexpected URL shape.
export function extractPokemonIdFromUrl(url: string): number | null {
  const match = url.match(POKEMON_DETAIL_URL_ID_PATTERN);
  return match ? Number(match[1]) : null;
}

// The official artwork/sprite CDN keys images by numeric Pokémon id, so this
// can be derived locally from the id alone — no detail request needed just
// to render a card's image.
export function getPokemonSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
