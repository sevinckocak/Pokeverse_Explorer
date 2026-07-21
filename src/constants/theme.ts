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

// Single palette shape for the whole app — screens/components read colors
// from Redux (see store/settings + hooks/useThemeTokens) instead of picking
// their own hardcoded values. `surfaceBorder`/`divider`/`trackBackground`
// are older, more specific tokens the Pokemon Detail screen's components
// (GlassCard, StatRow, ...) already depend on; kept alongside the newer
// general-purpose `border` field rather than renamed,
// so nothing there had to change.
export interface ThemeColors {
  background: string;
  surface: string;
  surfaceSecondary: string;
  card: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  danger: string;
  success: string;
  surfaceBorder: string;
  divider: string;
  trackBackground: string;
}

// The brand accent stays the same blue in both modes — a stable identity
// color rather than something that should flip with the theme.
const ACCENT = '#5B7FFF';

export const LIGHT_THEME: ThemeColors = {
  background: '#FFFFFF',
  surface: '#FAFAFC',
  surfaceSecondary: '#F0F1F5',
  card: '#F5F6FA',
  border: 'rgba(0, 0, 0, 0.08)',
  textPrimary: '#12131A',
  textSecondary: '#5B5F6B',
  accent: ACCENT,
  danger: '#DC2626',
  success: '#16A34A',
  surfaceBorder: 'rgba(0, 0, 0, 0.08)',
  divider: 'rgba(0, 0, 0, 0.08)',
  trackBackground: 'rgba(0, 0, 0, 0.08)',
};

export const DARK_THEME: ThemeColors = {
  background: '#141B2D',
  surface: 'rgba(255, 255, 255, 0.1)',
  surfaceSecondary: 'rgba(255, 255, 255, 0.06)',
  card: 'rgba(255, 255, 255, 0.1)',
  border: 'rgba(255, 255, 255, 0.18)',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.64)',
  accent: ACCENT,
  danger: '#F87171',
  success: '#4ADE80',
  surfaceBorder: 'rgba(255, 255, 255, 0.18)',
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
