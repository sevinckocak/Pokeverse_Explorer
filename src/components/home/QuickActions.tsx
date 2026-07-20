import { memo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import QuickActionCard from '@/components/home/QuickActionCard';
import type { IoniconName } from '@/components/home/QuickActionCard';
import { SPACING } from '@/constants/theme';

interface QuickActionDefinition {
  key: string;
  icon: IoniconName;
}

const HORIZONTAL_PADDING = SPACING.lg;
const ITEM_GAP = SPACING.sm;

// `key` doubles as the `home.quickAction.<key>` translation key — see
// resources/en.json / tr.json.
const QUICK_ACTIONS: readonly QuickActionDefinition[] = [
  { key: 'favorites', icon: 'heart' },
  { key: 'random', icon: 'shuffle' },
  { key: 'abilities', icon: 'flash' },
  { key: 'evolutions', icon: 'leaf' },
  { key: 'types', icon: 'star' },
  { key: 'regions', icon: 'flame' },
];

function QuickActionsComponent() {
  const { t } = useTranslation();
  const { colors } = useThemeTokens();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{t('home.quickActions')}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {QUICK_ACTIONS.map((action) => (
          <QuickActionCard
            key={action.key}
            icon={action.icon}
            label={t(`home.quickAction.${action.key}`)}
            onPress={() => console.log(`Quick action pressed: ${action.key}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default memo(QuickActionsComponent);

const styles = StyleSheet.create({
  container: {
    paddingBottom: SPACING.lg,
  },
  title: {
    paddingHorizontal: HORIZONTAL_PADDING,
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    flexDirection: 'row',
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: SPACING.md,
    gap: ITEM_GAP,
  },
});
