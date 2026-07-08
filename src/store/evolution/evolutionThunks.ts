import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEvolutionChain } from '@/services';
import type { EvolutionChain } from '@/types';

export const fetchEvolutionChain = createAsyncThunk<EvolutionChain, number>(
  'evolution/fetchEvolutionChain',
  async (chainId) => {
    return getEvolutionChain(chainId);
  }
);
