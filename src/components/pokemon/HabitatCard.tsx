import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { POKEMON_DETAIL_SECTION_DELAY, SPACING } from "@/constants/theme";
import { capitalize } from "@/utils/string";
import type { PokemonSpecies } from "@/types";
import type { PokemonTypeTheme } from "@/constants/pokemonTheme";

interface HabitatCardProps {
  species: PokemonSpecies;
  theme: PokemonTypeTheme;
}

const BADGE_TEXT_COLOR = "#FFFFFF";

function HabitatCardComponent({ species, theme }: HabitatCardProps) {
  const habitatLabel = species.habitat !== null ? capitalize(species.habitat.name) : "Unknown";
  const colorLabel = capitalize(species.color.name);

  return (
    <GlassCard title="Habitat" delay={POKEMON_DETAIL_SECTION_DELAY.habitat} theme={theme}>
      <View style={styles.row}>
        <Badge label={habitatLabel} backgroundColor={theme.chipColor} textColor={BADGE_TEXT_COLOR} />
        <Badge label={colorLabel} backgroundColor={theme.chipColor} textColor={BADGE_TEXT_COLOR} />
      </View>
    </GlassCard>
  );
}

export const HabitatCard = memo(HabitatCardComponent);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
});
