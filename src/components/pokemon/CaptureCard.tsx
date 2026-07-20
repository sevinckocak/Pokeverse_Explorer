import { memo } from "react";
import { useTranslation } from "react-i18next";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressStat } from "@/components/ui/ProgressStat";
import { POKEMON_DETAIL_SECTION_DELAY } from "@/constants/theme";
import { STAT_MAX_VALUE } from "@/constants/pokemonTheme";
import type { PokemonSpecies } from "@/types";
import type { PokemonTypeTheme } from "@/constants/pokemonTheme";

interface CaptureCardProps {
  species: PokemonSpecies;
  theme: PokemonTypeTheme;
}

function CaptureCardComponent({ species, theme }: CaptureCardProps) {
  const { t } = useTranslation();

  return (
    <GlassCard title={t('pokemonDetail.capture')} delay={POKEMON_DETAIL_SECTION_DELAY.capture} theme={theme}>
      <ProgressStat
        label={t('pokemonDetail.captureRate')}
        value={species.capture_rate}
        maxValue={STAT_MAX_VALUE}
        color={theme.progressColor}
      />
      <ProgressStat
        label={t('pokemonDetail.baseHappiness')}
        value={species.base_happiness}
        maxValue={STAT_MAX_VALUE}
        color={theme.progressColor}
      />
    </GlassCard>
  );
}

export const CaptureCard = memo(CaptureCardComponent);
