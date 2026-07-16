import type { Middleware } from '@reduxjs/toolkit';
import {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites as clearFavoritesAction,
} from '@/store/favorites/favoritesSlice';
import type { FavoritesState } from '@/store/favorites/favoritesSlice';
import { saveFavorites, clearFavorites as clearFavoritesStorage } from '@/storage/favoritesStorage';

const MUTATING_ACTION_TYPES = new Set<string>([
  addFavorite.type,
  removeFavorite.type,
  toggleFavorite.type,
  clearFavoritesAction.type,
]);

interface StateWithFavorites {
  favorites: FavoritesState;
}
export const favoritesPersistenceMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    const actionType = (action as { type?: unknown })?.type;

    if (typeof actionType === 'string' && MUTATING_ACTION_TYPES.has(actionType)) {
      if (actionType === clearFavoritesAction.type) {
        void clearFavoritesStorage();
      } else {
        const { favorites } = store.getState() as StateWithFavorites;
        void saveFavorites(favorites.favoriteIds);
      }
    }

    return result;
  };
