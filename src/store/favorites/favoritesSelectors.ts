import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

export const selectFavoritesState = (state: RootState) => state.favorites;

export const selectFavorites = createSelector(
  selectFavoritesState,
  (favoritesState) => favoritesState.favorites
);

export const selectIsFavorite = (name: string) =>
  createSelector(selectFavorites, (favorites) => favorites.some((item) => item.name === name));
