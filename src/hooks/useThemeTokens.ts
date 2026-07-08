import { useColorScheme } from 'react-native';
import { DARK_THEME_COLORS, LIGHT_THEME_COLORS } from '@/constants/theme';
import type { ThemeColors } from '@/constants/theme';

export interface ThemeTokens {
  colors: ThemeColors;
  isDark: boolean;
}

export function useThemeTokens(): ThemeTokens {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return {
    colors: isDark ? DARK_THEME_COLORS : LIGHT_THEME_COLORS,
    isDark,
  };
}
