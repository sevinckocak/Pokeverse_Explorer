import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { SPACING } from '@/constants/theme';
import type { DetailSection } from '@/constants/detailMenu';

interface DetailContentProps {
  section: DetailSection;
}

// Placeholder body for the redesigned Pokemon Detail screen. Each menu
// section will eventually render its own content here — for now every
// section shows the same "coming soon" message keyed off its translated
// label, so wiring in real content later only means replacing this body.
function DetailContentComponent({ section }: DetailContentProps) {
  const { t } = useTranslation();
  const { colors } = useThemeTokens();

  return (
    <View style={styles.container}>
      <Text style={[styles.message, { color: colors.textSecondary }]}>
        {t('pokemonDetail.comingSoon', { section: t(`pokemonDetail.menu.${section}`) })}
      </Text>
    </View>
  );
}

export default memo(DetailContentComponent);

const styles = StyleSheet.create({
  container: {
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
