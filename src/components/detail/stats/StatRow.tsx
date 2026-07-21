import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import { RADIUS, SPACING } from "@/constants/theme";

interface StatRowProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

// Static bar — no animation, matching the other Detail sections built so
// far (Evolution/Abilities). The width is derived directly from
// value/maxValue on every render, no local state needed.
function StatRowComponent({ label, value, maxValue, color }: StatRowProps) {
  const { colors } = useThemeTokens();
  const percentage = Math.min(100, Math.round((value / maxValue) * 100));

  return (
    <View style={styles.row}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
        <Text style={[styles.value, { color: colors.textPrimary }]}>{value}</Text>
      </View>
      <View style={[styles.track, { backgroundColor: colors.trackBackground }]}>
        <View style={[styles.fill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

export default memo(StatRowComponent);

const styles = StyleSheet.create({
  row: {
    marginBottom: SPACING.md,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
  },
  value: {
    fontSize: 13,
    fontWeight: "700",
  },
  track: {
    height: 10,
    borderRadius: RADIUS.pill,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: RADIUS.pill,
  },
});
