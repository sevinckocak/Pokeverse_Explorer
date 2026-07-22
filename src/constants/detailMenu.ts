import type { IoniconName } from '@/types/ionicon';

export const DETAIL_SECTIONS = ['overview', 'evolution', 'abilities', 'stats', 'moves'] as const;

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
  { section: 'evolution', icon: 'git-branch-outline' },
  { section: 'abilities', icon: 'flash-outline' },
  { section: 'stats', icon: 'stats-chart-outline' },
  { section: 'moves', icon: 'list-outline' },
];

export const DEFAULT_DETAIL_SECTION: DetailSection = 'overview';
