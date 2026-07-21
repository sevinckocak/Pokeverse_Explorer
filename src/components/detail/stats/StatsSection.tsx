import { memo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { GlassCard } from "@/components/ui/GlassCard";
import StatRow from "@/components/detail/stats/StatRow";
import { STAT_MAX_VALUE } from "@/constants/pokemonTheme";
import type { PokemonTypeTheme } from "@/constants/pokemonTheme";
import type { PokemonDetail } from "@/types";

interface StatsSectionProps {
  detail: PokemonDetail;
  theme: PokemonTypeTheme;
}

// Reads `detail.stats` straight off the PokemonDetail already loaded on
// mount (fetched once as part of the main /pokemon/{id} request) — no
// fetch, no service, no Redux slice of its own. Switching sections back
// and forth just re-renders from the same in-memory data every time.
function StatsSectionComponent({ detail, theme }: StatsSectionProps) {
  const { t } = useTranslation();

  return (
    <View>
      <GlassCard theme={theme}>
        {detail.stats.map((stat) => (
          <StatRow
            key={stat.name}
            label={t(`pokemonDetail.stat.${stat.name}`)}
            value={stat.value}
            maxValue={STAT_MAX_VALUE}
            color={theme.progressColor}
          />
        ))}
      </GlassCard>
    </View>
  );
}

export default memo(StatsSectionComponent);
