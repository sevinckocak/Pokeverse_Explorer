import { Fragment, memo, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import MoveRow from "@/components/detail/moves/MoveRow";
import { RADIUS, SPACING } from "@/constants/theme";
import type { PokemonDetail } from "@/types";

interface MovesSectionProps {
  detail: PokemonDetail;
}

const INITIAL_VISIBLE_COUNT = 20;
const CHEVRON_SIZE = 16;

// Reads `detail.moves` straight off the PokemonDetail already loaded on
// mount (fetched once as part of the main /pokemon/{id} request) — no
// fetch, no service, no Redux slice of its own. "Show More" only expands
// local component state over data already in memory; it never fetches.
function MovesSectionComponent({ detail }: MovesSectionProps) {
  const { t } = useTranslation();
  const { colors } = useThemeTokens();
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleMoves = useMemo(
    () => (isExpanded ? detail.moves : detail.moves.slice(0, INITIAL_VISIBLE_COUNT)),
    [detail.moves, isExpanded]
  );
  const hiddenCount = detail.moves.length - INITIAL_VISIBLE_COUNT;

  return (
    <View>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {visibleMoves.map((move, index) => (
          <Fragment key={move.name}>
            <MoveRow name={move.name} />
            {index < visibleMoves.length - 1 ? (
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
            ) : null}
          </Fragment>
        ))}
      </View>

      {!isExpanded && hiddenCount > 0 ? (
        <Pressable
          onPress={() => setIsExpanded(true)}
          style={[
            styles.showMoreButton,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
          accessibilityRole="button"
          accessibilityLabel={t("pokemonDetail.showMoreMoves", { count: hiddenCount })}
        >
          <Text style={[styles.showMoreLabel, { color: colors.textPrimary }]}>
            {t("pokemonDetail.showMoreMoves", { count: hiddenCount })}
          </Text>
          <Ionicons name="chevron-down" size={CHEVRON_SIZE} color={colors.textPrimary} />
        </Pressable>
      ) : null}
    </View>
  );
}

export default memo(MovesSectionComponent);

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    overflow: "hidden",
  },
  divider: {
    height: 1,
    marginLeft: SPACING.md,
  },
  showMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  showMoreLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
});
