import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemonSpecies } from '@/services';
import type { PokemonSpecies } from '@/types';
import { fetchEvolutionChain } from '@/store/evolution/evolutionThunks';

export const fetchPokemonSpecies = createAsyncThunk<PokemonSpecies, string>(
  'species/fetchPokemonSpecies',
  async (name, { dispatch }) => {
    const species = await getPokemonSpecies(name);

    if (species.evolutionChainId !== null) {
      dispatch(fetchEvolutionChain(species.evolutionChainId));
    }

    return species;
  }
);
