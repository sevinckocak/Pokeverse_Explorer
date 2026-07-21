import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import { getPokemonTheme } from "@/constants/pokemonTheme";
import type { PokemonTypeTheme } from "@/constants/pokemonTheme";
import { SPACING } from "@/constants/theme";
import { capitalize } from "@/utils/string";
import type { PokemonDetail } from "@/types";

interface OverviewSectionProps {
  detail: PokemonDetail;
  theme: PokemonTypeTheme;
}

const BADGE_TEXT_COLOR = "#FFFFFF";

// Renders only data already present on the PokemonDetail object already
// loaded into Redux (types, height/weight, base experience, abilities) — no
// additional fetch happens here. The artwork itself is shown once, in the
// hero section above; this section never renders a second Pokemon image.
function OverviewSectionComponent({ detail, theme }: OverviewSectionProps) {
  const { t } = useTranslation();
  const { colors } = useThemeTokens();

  const displayHeight = `${(detail.height / 10).toFixed(1)} m`;
  const displayWeight = `${(detail.weight / 10).toFixed(1)} kg`;
  const displayBaseExperience =
    detail.base_experience !== null ? detail.base_experience.toString() : t("common.unknown");

  return (
    <View>
      <GlassCard title={t("pokemonDetail.types")} theme={theme}>
        <View style={styles.typesRow}>
          {detail.types.map((entry) => {
            const typeTheme = getPokemonTheme(entry.type.name);
            return (
              <Badge
                key={entry.type.name}
                label={t(`types.${entry.type.name}`)}
                backgroundColor={typeTheme.chipColor}
                textColor={BADGE_TEXT_COLOR}
              />
            );
          })}
        </View>
      </GlassCard>

      <GlassCard title={t("pokemonDetail.generalInfo")} theme={theme}>
        <View style={styles.statsRow}>
          <View style={styles.statColumn}>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>{displayHeight}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              {t("pokemonDetail.height")}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <View style={styles.statColumn}>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>{displayWeight}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              {t("pokemonDetail.weight")}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <View style={styles.statColumn}>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>
              {displayBaseExperience}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              {t("pokemonDetail.baseExperience")}
            </Text>
          </View>
        </View>
      </GlassCard>

      <GlassCard title={t("pokemonDetail.abilities")} theme={theme}>
        <View style={styles.abilitiesList}>
          {detail.abilities.map((entry) => (
            <View key={entry.ability.name} style={styles.abilityRow}>
              <Text style={[styles.abilityName, { color: colors.textPrimary }]}>
                {capitalize(entry.ability.name.replace(/-/g, " "))}
              </Text>
              {entry.is_hidden ? (
                <Badge
                  label={t("pokemonDetail.hiddenAbility")}
                  backgroundColor={theme.chipColor}
                  textColor={BADGE_TEXT_COLOR}
                />
              ) : null}
            </View>
          ))}
        </View>
      </GlassCard>
    </View>
  );
}

export default memo(OverviewSectionComponent);

const styles = StyleSheet.create({
  typesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statColumn: {
    flex: 1,
    alignItems: "center",
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    marginHorizontal: SPACING.md,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
  },
  statLabel: {
    marginTop: SPACING.xs,
    fontSize: 12,
    fontWeight: "600",
  },
  abilitiesList: {
    gap: SPACING.sm,
  },
  abilityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  abilityName: {
    fontSize: 15,
    fontWeight: "600",
  },
});
