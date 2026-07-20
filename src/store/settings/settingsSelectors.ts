import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import { DARK_THEME, LIGHT_THEME } from '@/constants/theme';

export const selectSettingsState = (state: RootState) => state.settings;

export const selectTheme = createSelector(selectSettingsState, (settings) => settings.theme);

export const selectIsDarkMode = createSelector(selectTheme, (theme) => theme === 'dark');

export const selectLanguage = createSelector(selectSettingsState, (settings) => settings.language);

export const selectNotificationsEnabled = createSelector(
  selectSettingsState,
  (settings) => settings.notifications
);

export const selectThemeColors = createSelector(selectIsDarkMode, (isDark) =>
  isDark ? DARK_THEME : LIGHT_THEME
);
