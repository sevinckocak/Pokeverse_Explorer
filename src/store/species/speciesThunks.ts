import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemonSpecies } from '@/services';
import type { PokemonSpecies } from '@/types';
import { fetchEvolutionChain } from '@/store/evolution/evolutionThunks';
import { extractEvolutionChainId } from '@/utils/evolutionChain';

export const fetchPokemonSpecies = createAsyncThunk<PokemonSpecies, string>(
  'species/fetchPokemonSpecies',
  async (name, { dispatch }) => {
    const species = await getPokemonSpecies(name);

    try {
      const chainId = extractEvolutionChainId(species.evolution_chain.url);
      dispatch(fetchEvolutionChain(chainId));
    } catch {
      // Evolution chain URL missing or malformed: species data is still valid on its own.
    }

    return species;
  }
);
