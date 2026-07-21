import { memo, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { getPokemonTheme } from '@/constants/pokemonTheme';
import OverviewSection from '@/components/detail/OverviewSection';
import { SPACING } from '@/constants/theme';
import type { DetailSection } from '@/constants/detailMenu';
import type { PokemonDetail } from '@/types';

interface DetailContentProps {
  section: DetailSection;
  detail: PokemonDetail;
}

// Overview renders real data already sitting on the PokemonDetail Redux
// slice (no extra fetch). Every other section is still a placeholder until
// its own content is built.
function DetailContentComponent({ section, detail }: DetailContentProps) {
  const { t } = useTranslation();
  const { colors } = useThemeTokens();
  const primaryType = detail.types[0]?.type.name ?? null;
  const theme = useMemo(() => getPokemonTheme(primaryType), [primaryType]);

  if (section === 'overview') {
    return <OverviewSection detail={detail} theme={theme} />;
  }

  return (
    <View style={styles.placeholder}>
      <Text style={[styles.message, { color: colors.textSecondary }]}>
        {t('pokemonDetail.comingSoon', { section: t(`pokemonDetail.menu.${section}`) })}
      </Text>
    </View>
  );
}

export default memo(DetailContentComponent);

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  message: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});
