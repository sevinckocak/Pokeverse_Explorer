import { memo } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressStat } from "@/components/ui/ProgressStat";
import { ANIMATION } from "@/constants/theme";
import { STAT_MAX_VALUE } from "@/constants/pokemonTheme";
import type { PokemonSpecies } from "@/types";

interface CaptureCardProps {
  species: PokemonSpecies;
}

const CAPTURE_RATE_COLOR = "#4BC17A";
const BASE_HAPPINESS_COLOR = "#F2A93B";

function CaptureCardComponent({ species }: CaptureCardProps) {
  return (
    <GlassCard title="Capture" delay={ANIMATION.staggerDelay * 3}>
      <ProgressStat
        label="Capture Rate"
        value={species.capture_rate}
        maxValue={STAT_MAX_VALUE}
        color={CAPTURE_RATE_COLOR}
      />
      <ProgressStat
        label="Base Happiness"
        value={species.base_happiness}
        maxValue={STAT_MAX_VALUE}
        color={BASE_HAPPINESS_COLOR}
      />
    </GlassCard>
  );
}

export const CaptureCard = memo(CaptureCardComponent);
