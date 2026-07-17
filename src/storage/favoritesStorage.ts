import { getStorageItem, removeStorageItem, setStorageItem } from '@/storage/asyncStorage';
import type { PokemonListItem } from '@/types';

export const FAVORITES_STORAGE_KEY = 'favorites';

export async function loadFavorites(): Promise<PokemonListItem[]> {
  const stored = await getStorageItem<PokemonListItem[]>(FAVORITES_STORAGE_KEY);
  return stored ?? [];
}

export async function saveFavorites(favorites: PokemonListItem[]): Promise<void> {
  await setStorageItem(FAVORITES_STORAGE_KEY, favorites);
}

export async function clearFavorites(): Promise<void> {
  await removeStorageItem(FAVORITES_STORAGE_KEY);
}