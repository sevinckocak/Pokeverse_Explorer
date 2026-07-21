import { memo, useCallback, useEffect } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import { fetchAbility } from "@/store/ability/abilityThunks";
import { selectAbilityEntry } from "@/store/ability/abilitySelectors";
import { Badge } from "@/components/ui/Badge";
import { RADIUS, SPACING } from "@/constants/theme";
import { capitalize } from "@/utils/string";
import type { PokemonTypeTheme } from "@/constants/pokemonTheme";

interface AbilityCardProps {
  name: string;
  isHidden: boolean;
  theme: PokemonTypeTheme;
}

const RETRY_ICON_SIZE = 14;
const BADGE_TEXT_COLOR = "#FFFFFF";

// Ability effect text is deliberately NOT fetched when the Detail screen
// opens — each card only dispatches `fetchAbility` once it mounts, i.e.
// once the user opens the Abilities section. The thunk's `condition` guard
// caches by ability name, so reopening (or viewing another Pokemon that
// shares the same ability) never performs another request.
function AbilityCardComponent({ name, isHidden, theme }: AbilityCardProps) {
  const { t } = useTranslation();
  const { colors } = useThemeTokens();
  const dispatch = useAppDispatch();
  const entry = useAppSelector(selectAbilityEntry(name));

  useEffect(() => {
    dispatch(fetchAbility(name));
  }, [dispatch, name]);

  const handleRetry = useCallback(() => {
    dispatch(fetchAbility(name));
  }, [dispatch, name]);

  const displayName = capitalize(name.replace(/-/g, " "));

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: theme.cardTint }]}>
      <View style={styles.header}>
        <Text style={[styles.name, { color: colors.textPrimary }]}>{displayName}</Text>
        {isHidden ? (
          <Badge
            label={t("pokemonDetail.hiddenAbility")}
            backgroundColor={theme.chipColor}
            textColor={BADGE_TEXT_COLOR}
          />
        ) : null}
      </View>

      {!entry || entry.status === "loading" ? (
        <ActivityIndicator size="small" color={colors.accent} style={styles.spinner} />
      ) : entry.status === "failed" ? (
        <View style={styles.errorRow}>
          <Text style={[styles.errorText, { color: colors.textSecondary }]}>
            {t("pokemonDetail.abilityLoadError")}
          </Text>
          <Pressable
            onPress={handleRetry}
            style={[styles.retryButton, { borderColor: colors.border }]}
            accessibilityRole="button"
            accessibilityLabel={t("common.retry")}
          >
            <Ionicons name="refresh" size={RETRY_ICON_SIZE} color={colors.textPrimary} />
          </Pressable>
        </View>
      ) : (
        <Text style={[styles.effect, { color: colors.textSecondary }]}>{entry.data?.shortEffect}</Text>
      )}
    </View>
  );
}

export default memo(AbilityCardComponent);

const styles = StyleSheet.create({
  card: {
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  spinner: {
    alignSelf: "flex-start",
  },
  effect: {
    fontSize: 13,
    lineHeight: 19,
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  errorText: {
    fontSize: 13,
    flex: 1,
  },
  retryButton: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
