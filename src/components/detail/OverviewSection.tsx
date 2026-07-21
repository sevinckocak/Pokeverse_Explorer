import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { useAppSelector } from "@/hooks/useRedux";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import { selectPokemonSpecies } from "@/store/species/speciesSelectors";
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
// "Inactive" is intentionally not theme-driven: a badge for a status the
// Pokemon doesn't have should read as neutrally "off", not tinted by type.
const INACTIVE_STATUS = { backgroundColor: "rgba(120, 120, 130, 0.14)", textColor: "#8A8A99" };

// Renders data already present on the PokemonDetail object (types,
// height/weight, base experience, abilities) AND the PokemonSpecies object
// (habitat, color, capture rate, base happiness, genus, legendary/mythical)
// — both already loaded into Redux on screen mount. No additional fetch
// happens here; this section only ever reads existing state.
function OverviewSectionComponent({ detail, theme }: OverviewSectionProps) {
  const { t } = useTranslation();
  const { colors } = useThemeTokens();
  const species = useAppSelector(selectPokemonSpecies);

  const displayHeight = `${(detail.height / 10).toFixed(1)} m`;
  const displayWeight = `${(detail.weight / 10).toFixed(1)} kg`;
  const displayBaseExperience =
    detail.baseExperience !== null ? detail.baseExperience.toString() : t("common.unknown");

  const habitatLabel = species?.habitat ? capitalize(species.habitat) : t("common.unknown");
  const colorLabel = species?.color ? capitalize(species.color) : t("common.unknown");
  const classificationLabel = species?.genus ?? t("common.unknown");
  const isLegendary = species?.isLegendary ?? false;
  const isMythical = species?.isMythical ?? false;
  const legendaryStyle = isLegendary
    ? { backgroundColor: theme.chipColor, textColor: BADGE_TEXT_COLOR }
    : INACTIVE_STATUS;
  const mythicalStyle = isMythical
    ? { backgroundColor: theme.chipColor, textColor: BADGE_TEXT_COLOR }
    : INACTIVE_STATUS;

  return (
    <View>
      <GlassCard title={t("pokemonDetail.types")} theme={theme}>
        <View style={styles.typesRow}>
          {detail.types.map((typeName) => {
            const typeTheme = getPokemonTheme(typeName);
            return (
              <Badge
                key={typeName}
                label={t(`types.${typeName}`)}
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
          {detail.abilities.map((ability) => (
            <View key={ability.name} style={styles.infoRow}>
              <Text style={[styles.abilityName, { color: colors.textPrimary }]}>
                {capitalize(ability.name.replace(/-/g, " "))}
              </Text>
              {ability.isHidden ? (
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

      <GlassCard title={t("pokemonDetail.species")} theme={theme}>
        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              {t("pokemonDetail.habitat")}
            </Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{habitatLabel}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              {t("pokemonDetail.color")}
            </Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{colorLabel}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              {t("pokemonDetail.captureRate")}
            </Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
              {species?.captureRate ?? t("common.unknown")}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              {t("pokemonDetail.baseHappiness")}
            </Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
              {species?.baseHappiness ?? t("common.unknown")}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              {t("pokemonDetail.classification")}
            </Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
              {classificationLabel}
            </Text>
          </View>
        </View>
      </GlassCard>

      <GlassCard title={t("pokemonDetail.status")} theme={theme}>
        <View style={styles.statusRow}>
          <Badge
            label={t("pokemonDetail.legendary")}
            backgroundColor={legendaryStyle.backgroundColor}
            textColor={legendaryStyle.textColor}
          />
          <Badge
            label={t("pokemonDetail.mythical")}
            backgroundColor={mythicalStyle.backgroundColor}
            textColor={mythicalStyle.textColor}
          />
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
  abilityName: {
    fontSize: 15,
    fontWeight: "600",
  },
  infoList: {
    gap: SPACING.sm,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "700",
  },
  statusRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
});
