import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const evolutionChain = useAppSelector(selectEvolutionChain);
  const loading = useAppSelector(selectEvolutionLoading);
  const error = useAppSelector(selectEvolutionError);

  if (loading) {
    return (
      <SectionState
        title={t('pokemonDetail.evolutionChain')}
        message={t('pokemonDetail.loadingEvolutionChain')}
        theme={theme}
      />
    );
  }

  if (error) {
    return <SectionState title={t('pokemonDetail.evolutionChain')} message={error} theme={theme} />;
  }

  if (evolutionChain === null) {
    return null;
  }

  return (
    <GlassCard title={t('pokemonDetail.evolutionChain')} delay={POKEMON_DETAIL_SECTION_DELAY.evolution} theme={theme}>
      <EvolutionNode node={evolutionChain.root} accentColor={theme.accent} />
    </GlassCard>
  );
}
