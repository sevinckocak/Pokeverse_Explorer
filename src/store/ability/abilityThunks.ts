import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAbilityByName } from '@/services';
import { mapAbilityDetailToAbility } from '@/mappers';
import type { Ability } from '@/types';

export interface FetchAbilityPayload {
  name: string;
  isHidden: boolean;
}

export const fetchAbility = createAsyncThunk<Ability, FetchAbilityPayload, { rejectValue: string }>(
  'ability/fetchAbility',
  async ({ name, isHidden }, { rejectWithValue }) => {
    try {
      const detail = await getAbilityByName(name);
      return mapAbilityDetailToAbility(detail, isHidden);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch ability';
      return rejectWithValue(message);
    }
  }
);
