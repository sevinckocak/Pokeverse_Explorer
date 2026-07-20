import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { hydrateSettings } from '@/store/settings/settingsThunks';

export type ThemeMode = 'light' | 'dark';

export interface SettingsState {
  theme: ThemeMode;
  language: string;
  notifications: boolean;
}

const initialState: SettingsState = {
  theme: 'light',
  language: 'en',
  notifications: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.notifications = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateSettings.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.language = action.payload;
      }
    });
  },
});

export const { setTheme, toggleTheme, setLanguage, setNotificationsEnabled } =
  settingsSlice.actions;
export default settingsSlice.reducer;
