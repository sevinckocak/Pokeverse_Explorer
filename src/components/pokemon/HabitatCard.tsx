import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ANIMATION, SPACING } from "@/constants/theme";
import { getPokemonGradient } from "@/constants/pokemonTheme";
import { capitalize } from "@/utils/string";
import type { PokemonSpecies } from "@/types";

interface HabitatCardProps {
  species: PokemonSpecies;
}

const HABITAT_BADGE_BACKGROUND = "rgba(120, 120, 200, 0.16)";
const HABITAT_BADGE_TEXT_COLOR = "#4B4BD1";
const COLOR_BADGE_TEXT_COLOR = "#FFFFFF";

function HabitatCardComponent({ species }: HabitatCardProps) {
  const habitatLabel = species.habitat !== null ? capitalize(species.habitat.name) : "Unknown";
  const colorLabel = capitalize(species.color.name);
  const [colorTint] = getPokemonGradient(species.color.name);

  return (
    <GlassCard title="Habitat" delay={ANIMATION.staggerDelay * 2}>
      <View style={styles.row}>
        <Badge
          label={habitatLabel}
          backgroundColor={HABITAT_BADGE_BACKGROUND}
          textColor={HABITAT_BADGE_TEXT_COLOR}
        />
        <Badge label={colorLabel} backgroundColor={colorTint} textColor={COLOR_BADGE_TEXT_COLOR} />
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
