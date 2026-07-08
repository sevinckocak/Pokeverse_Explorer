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

export default function PokemonEvolution() {
  const evolutionChain = useAppSelector(selectEvolutionChain);
  const loading = useAppSelector(selectEvolutionLoading);
  const error = useAppSelector(selectEvolutionError);

  if (loading) {
    return <SectionState title="Evolution Chain" message="Loading evolution chain..." />;
  }

  if (error) {
    return <SectionState title="Evolution Chain" message={error} />;
  }

  if (evolutionChain === null) {
    return null;
  }

  return (
    <GlassCard title="Evolution Chain" delay={POKEMON_DETAIL_SECTION_DELAY.evolution}>
      <EvolutionNode node={evolutionChain.chain} />
    </GlassCard>
  );
}
