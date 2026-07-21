import type { PokemonDetail } from '@/types';

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

// Single source of truth for which image represents a Pokemon on the detail
// screen — prefers the higher-resolution official artwork already present
// on the fetched PokemonDetail, falling back to the default sprite so
// callers never need to render more than one image for the same Pokemon.
export function getPokemonHeroArtworkUrl(detail: PokemonDetail): string | null {
  return detail.sprites.other?.['official-artwork']?.front_default ?? detail.sprites.front_default;
}
