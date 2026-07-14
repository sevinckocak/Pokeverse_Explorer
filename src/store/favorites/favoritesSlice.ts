import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FavoritesState {
  favoriteIds: string[];
}

const initialState: FavoritesState = {
  favoriteIds: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const existingIndex = state.favoriteIds.indexOf(action.payload);

      if (existingIndex === -1) {
        state.favoriteIds.push(action.payload);
      } else {
        state.favoriteIds.splice(existingIndex, 1);
      }
    },
    clearFavorites: (state) => {
      state.favoriteIds = [];
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
