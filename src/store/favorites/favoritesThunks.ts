import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadFavorites } from '@/storage/favoritesStorage';
import type { PokemonListItem } from '@/types';

export const hydrateFavorites = createAsyncThunk<PokemonListItem[]>('favorites/hydrate', async () => {
  return loadFavorites();
});
