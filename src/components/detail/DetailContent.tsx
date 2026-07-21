import { memo, useMemo } from 'react';
import { getPokemonTheme } from '@/constants/pokemonTheme';
import OverviewSection from '@/components/detail/OverviewSection';
import EvolutionSection from '@/components/detail/EvolutionSection';
import AbilitiesSection from '@/components/detail/AbilitiesSection';
import StatsSection from '@/components/detail/stats/StatsSection';
import MovesSection from '@/components/detail/moves/MovesSection';
import type { DetailSection } from '@/constants/detailMenu';
import type { PokemonDetail } from '@/types';

interface DetailContentProps {
  section: DetailSection;
  detail: PokemonDetail;
}

// Every section reads from the PokemonDetail (and, for Evolution, the
// species/evolution Redux state) already loaded on screen mount — none of
// these branches trigger a fetch of their own except lazily, on first open
// (Evolution, Abilities).
function DetailContentComponent({ section, detail }: DetailContentProps) {
  const primaryType = detail.types[0] ?? null;
  const theme = useMemo(() => getPokemonTheme(primaryType), [primaryType]);

  switch (section) {
    case 'overview':
      return <OverviewSection detail={detail} theme={theme} />;
    case 'evolution':
      return <EvolutionSection theme={theme} />;
    case 'abilities':
      return <AbilitiesSection detail={detail} theme={theme} />;
    case 'stats':
      return <StatsSection detail={detail} theme={theme} />;
    case 'moves':
      return <MovesSection detail={detail} />;
  }
}

export default memo(DetailContentComponent);
