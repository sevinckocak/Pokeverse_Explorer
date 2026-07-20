import { useAppSelector } from '@/hooks/useRedux';
import { selectIsDarkMode, selectThemeColors } from '@/store/settings/settingsSelectors';
import type { ThemeColors } from '@/constants/theme';

export interface ThemeTokens {
  colors: ThemeColors;
  isDark: boolean;
}

// Single theme-access point for the whole app (screens and shared
// components alike) — backed by Redux settings state instead of the OS
// color scheme, so toggling Dark Mode in Settings updates every consumer
// immediately via normal Redux subscription, no reload required.
export function useThemeTokens(): ThemeTokens {
  const isDark = useAppSelector(selectIsDarkMode);
  const colors = useAppSelector(selectThemeColors);

  return { colors, isDark };
}
