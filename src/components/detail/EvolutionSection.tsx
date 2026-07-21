import { memo, useCallback, useEffect } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import {
  selectPokemonSpecies,
  selectSpeciesError,
  selectSpeciesLoading,
} from "@/store/species/speciesSelectors";
import { fetchEvolution } from "@/store/evolution/evolutionThunks";
import { selectEvolutionEntry } from "@/store/evolution/evolutionSelectors";
import EvolutionCard from "@/components/detail/EvolutionCard";
import { RADIUS, SPACING } from "@/constants/theme";
import type { PokemonTypeTheme } from "@/constants/pokemonTheme";
import type { EvolutionNode } from "@/types";

interface EvolutionSectionProps {
  theme: PokemonTypeTheme;
}

const RETRY_ICON_SIZE = 16;
const ARROW_ICON_SIZE = 20;

// Only the case this section renders today: a linear chain (A -> B -> C).
// A branching chain just follows the first branch — rendering every branch
// is a future enhancement, not part of this section's current scope.
function flattenChain(node: EvolutionNode): EvolutionNode[] {
  const chain: EvolutionNode[] = [node];
  let current = node;

  while (current.evolvesTo.length > 0) {
    current = current.evolvesTo[0];
    chain.push(current);
  }

  return chain;
}

// Evolution data is deliberately NOT fetched when the Detail screen opens.
// Species (already fetched on mount elsewhere) gives us `evolutionChainId`;
// this component only dispatches `fetchEvolution` once it actually mounts,
// i.e. once the user selects "Evolution" in the drawer. The thunk's
// `condition` guard makes every dispatch after the first a no-op cache hit.
function EvolutionSectionComponent({ theme }: EvolutionSectionProps) {
  const { t } = useTranslation();
  const { colors } = useThemeTokens();
  const dispatch = useAppDispatch();

  const species = useAppSelector(selectPokemonSpecies);
  const speciesLoading = useAppSelector(selectSpeciesLoading);
  const speciesError = useAppSelector(selectSpeciesError);
  const chainId = species?.evolutionChainId ?? null;
  const entry = useAppSelector(selectEvolutionEntry(chainId));

  useEffect(() => {
    if (chainId !== null) {
      dispatch(fetchEvolution(chainId));
    }
  }, [dispatch, chainId]);

  const handleRetry = useCallback(() => {
    if (chainId !== null) {
      dispatch(fetchEvolution(chainId));
    }
  }, [dispatch, chainId]);

  const isLoading = speciesLoading || (chainId !== null && (!entry || entry.status === "loading"));

  if (isLoading) {
    return (
      <View style={styles.state}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  const hasError = speciesError !== null || chainId === null || entry?.status === "failed";

  if (hasError) {
    return (
      <View style={styles.state}>
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>
          {t("pokemonDetail.evolutionLoadError")}
        </Text>
        <Pressable
          onPress={handleRetry}
          style={[styles.retryButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          accessibilityRole="button"
          accessibilityLabel={t("common.retry")}
        >
          <Ionicons name="refresh" size={RETRY_ICON_SIZE} color={colors.textPrimary} />
          <Text style={[styles.retryLabel, { color: colors.textPrimary }]}>{t("common.retry")}</Text>
        </Pressable>
      </View>
    );
  }

  if (!entry?.data) {
    return null;
  }

  const chain = flattenChain(entry.data.root);

  return (
    <View>
      {chain.map((node, index) => (
        <View key={node.name}>
          <EvolutionCard node={node} theme={theme} />
          {index < chain.length - 1 ? (
            <View style={styles.arrowRow}>
              <Ionicons name="arrow-down" size={ARROW_ICON_SIZE} color={colors.textSecondary} />
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
}

export default memo(EvolutionSectionComponent);

const styles = StyleSheet.create({
  state: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  errorText: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  retryLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  arrowRow: {
    alignItems: "center",
    paddingVertical: SPACING.xs,
  },
});
