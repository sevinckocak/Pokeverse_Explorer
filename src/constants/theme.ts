export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const RADIUS = {
  sm: 12,
  md: 20,
  lg: 28,
  pill: 999,
} as const;

export const ANIMATION = {
  staggerDelay: 90,
  duration: 450,
  progressDuration: 700,
} as const;

export const CARD_SHADOW = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.12,
  shadowRadius: 20,
  elevation: 6,
} as const;

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceBorder: string;
  textPrimary: string;
  textSecondary: string;
  divider: string;
  trackBackground: string;
}

export const LIGHT_THEME_COLORS: ThemeColors = {
  background: '#F4F5FA',
  surface: 'rgba(255, 255, 255, 0.55)',
  surfaceBorder: 'rgba(255, 255, 255, 0.4)',
  textPrimary: '#1C1C28',
  textSecondary: '#5B5B6B',
  divider: 'rgba(0, 0, 0, 0.08)',
  trackBackground: 'rgba(0, 0, 0, 0.08)',
};

export const DARK_THEME_COLORS: ThemeColors = {
  background: '#0E0E14',
  surface: 'rgba(255, 255, 255, 0.08)',
  surfaceBorder: 'rgba(255, 255, 255, 0.14)',
  textPrimary: '#F5F5FA',
  textSecondary: '#B5B5C6',
  divider: 'rgba(255, 255, 255, 0.12)',
  trackBackground: 'rgba(255, 255, 255, 0.12)',
};

// Single source of truth for the Pokemon Detail screen's staggered entrance
// order. Add a new key here (in visual order) when a new section is added,
// instead of hand-deriving a multiplier inside that section's own file.
export const POKEMON_DETAIL_SECTION_DELAY = {
  stats: ANIMATION.staggerDelay,
  habitat: ANIMATION.staggerDelay * 2,
  capture: ANIMATION.staggerDelay * 3,
  status: ANIMATION.staggerDelay * 4,
  evolution: ANIMATION.staggerDelay * 5,
} as const;

// Fixed dark "app shell" palette (Home, Search, Favorites, tab bar, cards).
// Deliberately separate from the light/dark-adaptive ThemeColors above —
// this shell is always-dark by design, regardless of system color scheme.
// Historically defined inside HomeHeader.tsx; still re-exported from there
// for every existing call site, but this is now the source of truth so
// other shared components (e.g. ScreenHeader) can use it without creating
// a circular import with HomeHeader.
export const HOME_HEADER_COLORS = {
  background: '#141B2D',
  accent: '#5B7FFF',
  title: '#FFFFFF',
  subtitle: 'rgba(255, 255, 255, 0.64)',
  glass: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.18)',
} as const;
