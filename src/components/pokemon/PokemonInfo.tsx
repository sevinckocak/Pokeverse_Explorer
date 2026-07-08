import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlassCard } from "@/components/ui/GlassCard";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import { ANIMATION, SPACING } from "@/constants/theme";

interface PokemonInfoProps {
  height: number;
  weight: number;
}

function PokemonInfoComponent({ height, weight }: PokemonInfoProps) {
  const { colors } = useThemeTokens();
  const displayHeight = `${(height / 10).toFixed(1)} m`;
  const displayWeight = `${(weight / 10).toFixed(1)} kg`;

  return (
    <GlassCard title="Stats" delay={ANIMATION.staggerDelay}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={[styles.value, { color: colors.textPrimary }]}>{displayHeight}</Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Height</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.divider }]} />
        <View style={styles.column}>
          <Text style={[styles.value, { color: colors.textPrimary }]}>{displayWeight}</Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Weight</Text>
        </View>
      </View>
    </GlassCard>
  );
}

export default memo(PokemonInfoComponent);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    marginHorizontal: SPACING.md,
  },
  value: {
    fontSize: 22,
    fontWeight: "800",
  },
  label: {
    marginTop: SPACING.xs,
    fontSize: 13,
    fontWeight: "600",
  },
});
