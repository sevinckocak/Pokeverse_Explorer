import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { hydrateFavorites } from '@/store/favorites/favoritesThunks';
import type { PokemonListItem } from '@/types';

export interface FavoritesState {
  favorites: PokemonListItem[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<PokemonListItem>) => {
      const exists = state.favorites.some((item) => item.name === action.payload.name);

      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((item) => item.name !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<PokemonListItem>) => {
      const existingIndex = state.favorites.findIndex(
        (item) => item.name === action.payload.name
      );

      if (existingIndex === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(existingIndex, 1);
      }
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
