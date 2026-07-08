import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { POKEMON_DETAIL_SECTION_DELAY, SPACING } from "@/constants/theme";
import type { PokemonSpecies } from "@/types";

interface StatusCardProps {
  species: PokemonSpecies;
}

const ACTIVE_LEGENDARY = { backgroundColor: "#F2B341", textColor: "#3A2600" };
const ACTIVE_MYTHICAL = { backgroundColor: "#B285F0", textColor: "#2A0F4D" };
const INACTIVE_STATUS = { backgroundColor: "rgba(120, 120, 130, 0.14)", textColor: "#8A8A99" };

function StatusCardComponent({ species }: StatusCardProps) {
  const legendaryStyle = species.is_legendary ? ACTIVE_LEGENDARY : INACTIVE_STATUS;
  const mythicalStyle = species.is_mythical ? ACTIVE_MYTHICAL : INACTIVE_STATUS;

  return (
    <GlassCard title="Status" delay={POKEMON_DETAIL_SECTION_DELAY.status}>
      <View style={styles.row}>
        <Badge
          label="Legendary"
          backgroundColor={legendaryStyle.backgroundColor}
          textColor={legendaryStyle.textColor}
        />
        <Badge
          label="Mythical"
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
