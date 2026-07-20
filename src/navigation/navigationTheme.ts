import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { DARK_THEME, LIGHT_THEME } from '@/constants/theme';

// `typeof DefaultTheme` instead of importing a `Theme` type directly: React
// Navigation doesn't re-export that type name from `@react-navigation/native`
// in this version, and deriving it from the theme object itself is just as
// safe without guessing an internal import path.
export type NavigationTheme = typeof DefaultTheme;

// Built once from the app's own color tokens (constants/theme.ts) — not
// hand-picked navigation-specific colors — so Stack headers, tab bars, and
// any default React Navigation UI always match the rest of the app. Spread
// over RN Navigation's own DefaultTheme/DarkTheme first so unrelated fields
// (e.g. `fonts`) stay intact.
export const LightNavigationTheme: NavigationTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: LIGHT_THEME.accent,
    background: LIGHT_THEME.background,
    card: LIGHT_THEME.card,
    text: LIGHT_THEME.textPrimary,
    border: LIGHT_THEME.border,
    notification: LIGHT_THEME.accent,
  },
};

export const DarkNavigationTheme: NavigationTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: DARK_THEME.accent,
    background: DARK_THEME.background,
    card: DARK_THEME.card,
    text: DARK_THEME.textPrimary,
    border: DARK_THEME.border,
    notification: DARK_THEME.accent,
  },
};
