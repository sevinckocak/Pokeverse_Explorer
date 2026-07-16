import { getStorageItem, removeStorageItem, setStorageItem } from '@/storage/asyncStorage';

export const FAVORITES_STORAGE_KEY = 'favorites';

export async function loadFavorites(): Promise<string[]> {
  const stored = await getStorageItem<string[]>(FAVORITES_STORAGE_KEY);
  return stored ?? [];
}

export async function saveFavorites(favoriteIds: string[]): Promise<void> {
  await setStorageItem(FAVORITES_STORAGE_KEY, favoriteIds);
}

export async function clearFavorites(): Promise<void> {
  await removeStorageItem(FAVORITES_STORAGE_KEY);
}
