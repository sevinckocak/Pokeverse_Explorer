import { useAppSelector } from '@/hooks/useRedux';
import { selectIsDarkMode } from '@/store/settings/settingsSelectors';
import { DarkNavigationTheme, LightNavigationTheme } from '@/navigation/navigationTheme';
import type { NavigationTheme } from '@/navigation/navigationTheme';

// Converts Redux's `settings.theme` into the theme object NavigationContainer
// expects. Reads the same selector useThemeTokens() is built on, so this
// stays in lockstep with every other theme-aware component — toggling Dark
// Mode re-renders this via normal Redux subscription, no reload needed.
export function useNavigationTheme(): NavigationTheme {
  const isDark = useAppSelector(selectIsDarkMode);
  return isDark ? DarkNavigationTheme : LightNavigationTheme;
}
