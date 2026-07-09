import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import { RADIUS, SPACING } from "@/constants/theme";
import { capitalize } from "@/utils/string";
import type { EvolutionChainNode } from "@/types";

interface EvolutionNodeProps {
  node: EvolutionChainNode;
  accentColor: string;
}

function EvolutionNodeComponent({ node, accentColor }: EvolutionNodeProps) {
  const { colors } = useThemeTokens();
  const isBranching = node.evolves_to.length > 1;

  return (
    <View>
      <View style={styles.row}>
        <View style={styles.timelineColumn}>
          <View style={[styles.dot, { backgroundColor: accentColor }]} />
          {node.evolves_to.length > 0 ? (
            <View style={[styles.line, { backgroundColor: colors.divider }]} />
          ) : null}
        </View>
        <View
          style={[
            styles.chip,
            { backgroundColor: colors.surface, borderColor: accentColor },
          ]}
        >
          <Text style={[styles.name, { color: colors.textPrimary }]}>
            {capitalize(node.species.name)}
          </Text>
        </View>
      </View>
      <View style={{ marginLeft: isBranching ? SPACING.lg : 0 }}>
        {node.evolves_to.map((child) => (
          <EvolutionNode key={child.species.name} node={child} accentColor={accentColor} />
        ))}
      </View>
    </View>
  );
}

const EvolutionNode = memo(EvolutionNodeComponent);

export default EvolutionNode;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  timelineColumn: {
    width: 16,
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: SPACING.md,
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: SPACING.lg,
  },
  chip: {
    flex: 1,
    marginLeft: SPACING.md,
    marginVertical: SPACING.xs,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
  },
});
