import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { GlassCard } from "@/components/ui/GlassCard";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import { POKEMON_DETAIL_SECTION_DELAY, SPACING } from "@/constants/theme";
import type { PokemonTypeTheme } from "@/constants/pokemonTheme";

interface PokemonInfoProps {
  height: number;
  weight: number;
  theme: PokemonTypeTheme;
}

function PokemonInfoComponent({ height, weight, theme }: PokemonInfoProps) {
  const { t } = useTranslation();
  const { colors } = useThemeTokens();
  const displayHeight = `${(height / 10).toFixed(1)} m`;
  const displayWeight = `${(weight / 10).toFixed(1)} kg`;

  return (
    <GlassCard title={t('pokemonDetail.stats')} delay={POKEMON_DETAIL_SECTION_DELAY.stats} theme={theme}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={[styles.value, { color: colors.textPrimary }]}>{displayHeight}</Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>{t('pokemonDetail.height')}</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.divider }]} />
        <View style={styles.column}>
          <Text style={[styles.value, { color: colors.textPrimary }]}>{displayWeight}</Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>{t('pokemonDetail.weight')}</Text>
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
