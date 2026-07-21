import type { IoniconName } from '@/components/home/QuickActionCard';

export const DETAIL_SECTIONS = [
  'overview',
  'stats',
  'species',
  'evolution',
  'abilities',
  'moves',
  'location',
  'sprites',
] as const;

export type DetailSection = (typeof DETAIL_SECTIONS)[number];

export interface DetailMenuItemConfig {
  section: DetailSection;
  icon: IoniconName;
}

// Single source of truth for the detail drawer's menu — the drawer renders
// this list directly, and the screen/content area derive their translated
// labels from the same `section` keys via `pokemonDetail.menu.<section>`.
export const DETAIL_MENU_ITEMS: readonly DetailMenuItemConfig[] = [
  { section: 'overview', icon: 'grid-outline' },
  { section: 'stats', icon: 'stats-chart-outline' },
  { section: 'species', icon: 'leaf-outline' },
  { section: 'evolution', icon: 'git-branch-outline' },
  { section: 'abilities', icon: 'flash-outline' },
  { section: 'moves', icon: 'list-outline' },
  { section: 'location', icon: 'location-outline' },
  { section: 'sprites', icon: 'images-outline' },
];

export const DEFAULT_DETAIL_SECTION: DetailSection = 'overview';
