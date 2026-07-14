import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

export const selectFavoritesState = (state: RootState) => state.favorites;

export const selectFavoriteIds = createSelector(
  selectFavoritesState,
  (favoritesState) => favoritesState.favoriteIds
);

export const selectFavorites = selectFavoriteIds;

export const selectIsFavorite = (name: string) =>
  createSelector(selectFavoriteIds, (favoriteIds) => favoriteIds.includes(name));
