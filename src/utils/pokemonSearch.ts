import type { PokemonListItem } from '@/types';

export function filterPokemonByName(
  pokemonList: PokemonListItem[],
  normalizedQuery: string
): PokemonListItem[] {
  return pokemonList.filter((item) => item.name.toLowerCase().includes(normalizedQuery));
}

// De-duplicates by name while preserving first-seen order, so combining
// name-matches with type-matches never produces a repeated card.
export function mergePokemonResults(...lists: PokemonListItem[][]): PokemonListItem[] {
  const merged = new Map<string, PokemonListItem>();

  lists.forEach((list) => {
    list.forEach((item) => {
      if (!merged.has(item.name)) {
        merged.set(item.name, item);
      }
    });
  });

  return Array.from(merged.values());
}
