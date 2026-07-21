import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAbilityByName } from '@/services';
import type { Ability } from '@/types';
import type { RootState } from '@/store/store';

// Keyed by ability name so caching works across every Pokemon that shares
// the same ability, not just within a single detail screen visit.
export const fetchAbility = createAsyncThunk<Ability, string, { state: RootState }>(
  'ability/fetchAbility',
  async (name) => {
    return getAbilityByName(name);
  },
  {
    // Same caching mechanism as evolution: skip the request if this
    // ability is already cached or already in flight. `AbilityCard` can
    // safely dispatch this on every mount without worrying about duplicate
    // requests — `status === 'failed'` is let through again so retry works.
    condition: (name, { getState }) => {
      const entry = getState().ability.byName[name];
      return entry === undefined || entry.status === 'failed';
    },
  }
);
