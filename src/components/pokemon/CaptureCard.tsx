import { memo } from "react";
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
  return (
    <GlassCard title="Capture" delay={POKEMON_DETAIL_SECTION_DELAY.capture} theme={theme}>
      <ProgressStat
        label="Capture Rate"
        value={species.capture_rate}
        maxValue={STAT_MAX_VALUE}
        color={theme.progressColor}
      />
      <ProgressStat
        label="Base Happiness"
        value={species.base_happiness}
        maxValue={STAT_MAX_VALUE}
        color={theme.progressColor}
      />
    </GlassCard>
  );
}

export const CaptureCard = memo(CaptureCardComponent);
