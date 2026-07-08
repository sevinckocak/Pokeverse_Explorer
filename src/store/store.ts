import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '@/store/pokemon/pokemonSlice';
import speciesReducer from '@/store/species/speciesSlice';
import evolutionReducer from '@/store/evolution/evolutionSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    species: speciesReducer,
    evolution: evolutionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
