import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemonSpecies } from '@/services';
import type { PokemonSpecies } from '@/types';

// Species alone is fetched on Detail screen mount — it's cheap and already
// needed for other future sections (Habitat). It deliberately does NOT
// trigger the evolution-chain fetch anymore: that only happens lazily, when
// the user opens the Evolution section (see EvolutionSection /
// store/evolution/evolutionThunks.ts).
export const fetchPokemonSpecies = createAsyncThunk<PokemonSpecies, string>(
  'species/fetchPokemonSpecies',
  async (name) => {
    return getPokemonSpecies(name);
  }
);
