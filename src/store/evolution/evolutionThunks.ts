import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEvolutionChain } from '@/services';
import type { Evolution } from '@/types';
import type { RootState } from '@/store/store';

// Keyed by evolutionChainId so caching works correctly across different
// Pokemon, not just within a single detail screen visit.
export const fetchEvolution = createAsyncThunk<Evolution, number, { state: RootState }>(
  'evolution/fetchEvolution',
  async (chainId) => {
    return getEvolutionChain(chainId);
  },
  {
    // The actual caching mechanism: if this chain already has cached data,
    // or a request for it is already in flight, skip the request entirely
    // (no `pending` action even fires). `EvolutionSection` can safely
    // dispatch this on every mount/open without worrying about duplicate
    // requests — `status === 'failed'` is the one case allowed through
    // again, so the retry button in the error state actually works.
    condition: (chainId, { getState }) => {
      const entry = getState().evolution.byChainId[chainId];
      return entry === undefined || entry.status === 'failed';
    },
  }
);
