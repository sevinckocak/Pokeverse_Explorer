import { useAppSelector } from "@/hooks/useRedux";
import {
  selectEvolutionChain,
  selectEvolutionError,
  selectEvolutionLoading,
} from "@/store/evolution/evolutionSelectors";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionState } from "@/components/ui/SectionState";
import EvolutionNode from "@/components/pokemon/EvolutionNode";
import { POKEMON_DETAIL_SECTION_DELAY } from "@/constants/theme";
import type { PokemonTypeTheme } from "@/constants/pokemonTheme";

interface PokemonEvolutionProps {
  theme: PokemonTypeTheme;
}

export default function PokemonEvolution({ theme }: PokemonEvolutionProps) {
  const evolutionChain = useAppSelector(selectEvolutionChain);
  const loading = useAppSelector(selectEvolutionLoading);
  const error = useAppSelector(selectEvolutionError);

  if (loading) {
    return <SectionState title="Evolution Chain" message="Loading evolution chain..." theme={theme} />;
  }

  if (error) {
    return <SectionState title="Evolution Chain" message={error} theme={theme} />;
  }

  if (evolutionChain === null) {
    return null;
  }

  return (
    <GlassCard title="Evolution Chain" delay={POKEMON_DETAIL_SECTION_DELAY.evolution} theme={theme}>
      <EvolutionNode node={evolutionChain.chain} accentColor={theme.accent} />
    </GlassCard>
  );
}
