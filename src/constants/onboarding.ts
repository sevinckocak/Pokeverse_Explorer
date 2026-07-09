import type { OnboardingSlideData } from '@/types';

export const ONBOARDING_STORAGE_KEY = 'onboarding_completed';

// Onboarding is dark-mode-first by design (not adaptive like the rest of the
// app), so it gets its own self-contained palette rather than reusing
// `constants/theme.ts`'s light/dark tokens.
export const ONBOARDING_COLORS = {
  background: '#0F172A',
  primary: '#6366F1',
  secondary: '#8B5CF6',
  accent: '#06B6D4',
  text: '#FFFFFF',
  textMuted: 'rgba(255, 255, 255, 0.64)',
  glass: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.16)',
} as const;

export const ONBOARDING_SLIDES: readonly OnboardingSlideData[] = [
  {
    id: 'explore',
    title: 'Explore the Pokémon Universe',
    description:
      'Discover every Pokémon with detailed information, beautiful artwork, evolutions and abilities.',
    illustration: 'universe',
  },
  {
    id: 'everything',
    title: 'Everything in One Place',
    description: 'Browse Pokémon stats, abilities, species, evolution chain and much more.',
    illustration: 'everything',
  },
  {
    id: 'ready',
    title: 'Ready to Begin?',
    description: 'Search your favorite Pokémon and build your own Pokédex experience.',
    illustration: 'ready',
  },
] as const;
