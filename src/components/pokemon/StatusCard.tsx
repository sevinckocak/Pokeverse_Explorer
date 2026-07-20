import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { POKEMON_DETAIL_SECTION_DELAY, SPACING } from "@/constants/theme";
import type { PokemonSpecies } from "@/types";
import type { PokemonTypeTheme } from "@/constants/pokemonTheme";

interface StatusCardProps {
  species: PokemonSpecies;
  theme: PokemonTypeTheme;
}

const ACTIVE_TEXT_COLOR = "#FFFFFF";
// "Inactive" is intentionally not theme-driven: a badge for a status the
// Pokemon doesn't have should read as neutrally "off", not tinted by type.
const INACTIVE_STATUS = { backgroundColor: "rgba(120, 120, 130, 0.14)", textColor: "#8A8A99" };

function StatusCardComponent({ species, theme }: StatusCardProps) {
  const { t } = useTranslation();
  const activeStyle = { backgroundColor: theme.chipColor, textColor: ACTIVE_TEXT_COLOR };
  const legendaryStyle = species.is_legendary ? activeStyle : INACTIVE_STATUS;
  const mythicalStyle = species.is_mythical ? activeStyle : INACTIVE_STATUS;

  return (
    <GlassCard title={t('pokemonDetail.status')} delay={POKEMON_DETAIL_SECTION_DELAY.status} theme={theme}>
      <View style={styles.row}>
        <Badge
          label={t('pokemonDetail.legendary')}
          backgroundColor={legendaryStyle.backgroundColor}
          textColor={legendaryStyle.textColor}
        />
        <Badge
          label={t('pokemonDetail.mythical')}
          backgroundColor={mythicalStyle.backgroundColor}
          textColor={mythicalStyle.textColor}
        />
      </View>
    </GlassCard>
  );
}

export const StatusCard = memo(StatusCardComponent);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
});
