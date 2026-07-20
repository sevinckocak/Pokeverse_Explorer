import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadLanguage } from '@/storage/settingsStorage';

export const hydrateSettings = createAsyncThunk<string | null>('settings/hydrate', async () => {
  return loadLanguage();
});
