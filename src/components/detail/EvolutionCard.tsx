import { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import { RADIUS, SPACING } from "@/constants/theme";
import { capitalize } from "@/utils/string";
import type { PokemonTypeTheme } from "@/constants/pokemonTheme";
import type { EvolutionNode } from "@/types";

interface EvolutionCardProps {
  node: EvolutionNode;
  theme: PokemonTypeTheme;
}

const ARTWORK_SIZE = 80;

// Intentionally static — no entrance animation, per the Evolution section
// spec (cards connected by arrows, nothing more).
function EvolutionCardComponent({ node, theme }: EvolutionCardProps) {
  const { colors } = useThemeTokens();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: theme.cardTint }]}>
      {node.artwork ? (
        <Image source={{ uri: node.artwork }} style={styles.artwork} resizeMode="contain" />
      ) : (
        <View
          style={[styles.artwork, styles.artworkPlaceholder, { backgroundColor: colors.surfaceSecondary }]}
        />
      )}
      <Text style={[styles.name, { color: colors.textPrimary }]}>{capitalize(node.name)}</Text>
    </View>
  );
}

export default memo(EvolutionCardComponent);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
  },
  artwork: {
    width: ARTWORK_SIZE,
    height: ARTWORK_SIZE,
  },
  artworkPlaceholder: {
    borderRadius: RADIUS.md,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
});
