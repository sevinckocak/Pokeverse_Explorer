import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '@/store/pokemon/pokemonSlice';
import speciesReducer from '@/store/species/speciesSlice';
import evolutionReducer from '@/store/evolution/evolutionSlice';
import abilityReducer from '@/store/ability/abilitySlice';
import favoritesReducer from '@/store/favorites/favoritesSlice';
import { favoritesPersistenceMiddleware } from '@/store/favorites/favoritesPersistenceMiddleware';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    species: speciesReducer,
    evolution: evolutionReducer,
    ability: abilityReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(favoritesPersistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
