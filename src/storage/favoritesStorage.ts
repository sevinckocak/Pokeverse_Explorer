import { getStorageItem, removeStorageItem, setStorageItem } from '@/storage/asyncStorage';
import { extractPokemonIdFromUrl } from '@/utils/pokemonAssets';
import type { PokemonListItem } from '@/types';

export const FAVORITES_STORAGE_KEY = 'favorites';

// Builds prior to the PokemonListItem domain refactor persisted
// `{ name, url }`. Normalizing on load means favorites saved before that
// change still resolve an `id` (and therefore still render a sprite)
// instead of silently losing it.
interface StoredFavoriteItem {
  id?: number | null;
  name: string;
  url?: string;
}

function normalizeStoredFavorite(item: StoredFavoriteItem): PokemonListItem {
  if (typeof item.id === 'number') {
    return { id: item.id, name: item.name };
  }

  return {
    id: item.url ? extractPokemonIdFromUrl(item.url) : null,
    name: item.name,
  };
}

export async function loadFavorites(): Promise<PokemonListItem[]> {
  const stored = await getStorageItem<StoredFavoriteItem[]>(FAVORITES_STORAGE_KEY);
  return (stored ?? []).map(normalizeStoredFavorite);
}

export async function saveFavorites(favorites: PokemonListItem[]): Promise<void> {
  await setStorageItem(FAVORITES_STORAGE_KEY, favorites);
}

export async function clearFavorites(): Promise<void> {
  await removeStorageItem(FAVORITES_STORAGE_KEY);
}
