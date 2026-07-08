import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getEvolutionChain,
  getPokemonByNameOrId,
  getPokemonList,
  getPokemonSpecies,
} from '@/services';
import type { EvolutionChain, PokemonDetail, PokemonListItem, PokemonSpecies } from '@/types';

export interface PokemonState {
  pokemonList: PokemonListItem[];
  loading: boolean;
  error: string | null;
  detail: PokemonDetail | null;
  loadingDetail: boolean;
  detailError: string | null;
  species: PokemonSpecies | null;
  loadingSpecies: boolean;
  speciesError: string | null;
  evolutionChain: EvolutionChain | null;
  loadingEvolution: boolean;
  evolutionError: string | null;
}

const initialState: PokemonState = {
  pokemonList: [],
  loading: false,
  error: null,
  detail: null,
  loadingDetail: false,
  detailError: null,
  species: null,
  loadingSpecies: false,
  speciesError: null,
  evolutionChain: null,
  loadingEvolution: false,
  evolutionError: null,
};

function extractEvolutionChainId(chainUrl: string): number {
  const segments = chainUrl.split('/').filter(Boolean);
  return Number(segments[segments.length - 1]);
}

export const fetchPokemonList = createAsyncThunk<
  PokemonListItem[],
  { limit?: number; offset?: number } | undefined
>('pokemon/fetchPokemonList', async (params) => {
  const { limit = 20, offset = 0 } = params ?? {};
  const response = await getPokemonList(limit, offset);
  return response.results;
});

export const fetchPokemonDetail = createAsyncThunk<PokemonDetail, string>(
  'pokemon/fetchPokemonDetail',
  async (name) => {
    return getPokemonByNameOrId(name);
  }
);

export const fetchPokemonSpecies = createAsyncThunk<PokemonSpecies, string>(
  'pokemon/fetchPokemonSpecies',
  async (name) => {
    return getPokemonSpecies(name);
  }
);

export const fetchEvolutionChain = createAsyncThunk<EvolutionChain, string>(
  'pokemon/fetchEvolutionChain',
  async (chainUrl) => {
    const chainId = extractEvolutionChainId(chainUrl);
    return getEvolutionChain(chainId);
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    clearPokemon: (state) => {
      state.pokemonList = [];
      state.loading = false;
      state.error = null;
      state.detail = null;
      state.loadingDetail = false;
      state.detailError = null;
      state.species = null;
      state.loadingSpecies = false;
      state.speciesError = null;
      state.evolutionChain = null;
      state.loadingEvolution = false;
      state.evolutionError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonList = action.payload;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch Pokémon list';
      })
      .addCase(fetchPokemonDetail.pending, (state) => {
        state.loadingDetail = true;
        state.detailError = null;
        state.detail = null;
      })
      .addCase(fetchPokemonDetail.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.detail = action.payload;
      })
      .addCase(fetchPokemonDetail.rejected, (state, action) => {
        state.loadingDetail = false;
        state.detailError = action.error.message ?? 'Failed to fetch Pokémon detail';
      })
      .addCase(fetchPokemonSpecies.pending, (state) => {
        state.loadingSpecies = true;
        state.speciesError = null;
        state.species = null;
      })
      .addCase(fetchPokemonSpecies.fulfilled, (state, action) => {
        state.loadingSpecies = false;
        state.species = action.payload;
      })
      .addCase(fetchPokemonSpecies.rejected, (state, action) => {
        state.loadingSpecies = false;
        state.speciesError = action.error.message ?? 'Failed to fetch Pokémon species';
      })
      .addCase(fetchEvolutionChain.pending, (state) => {
        state.loadingEvolution = true;
        state.evolutionError = null;
        state.evolutionChain = null;
      })
      .addCase(fetchEvolutionChain.fulfilled, (state, action) => {
        state.loadingEvolution = false;
        state.evolutionChain = action.payload;
      })
      .addCase(fetchEvolutionChain.rejected, (state, action) => {
        state.loadingEvolution = false;
        state.evolutionError = action.error.message ?? 'Failed to fetch evolution chain';
      });
  },
});

export const { clearPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
