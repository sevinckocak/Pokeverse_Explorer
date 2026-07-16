import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadFavorites } from '@/storage/favoritesStorage';

export const hydrateFavorites = createAsyncThunk<string[]>('favorites/hydrate', async () => {
  return loadFavorites();
});
