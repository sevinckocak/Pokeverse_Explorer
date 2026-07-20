import { memo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import QuickActionCard from '@/components/home/QuickActionCard';
import type { IoniconName } from '@/components/home/QuickActionCard';
import { SPACING } from '@/constants/theme';

interface QuickActionDefinition {
  key: string;
  icon: IoniconName;
  label: string;
}

const HORIZONTAL_PADDING = SPACING.lg;
const ITEM_GAP = SPACING.sm;

const QUICK_ACTIONS: readonly QuickActionDefinition[] = [
  { key: 'favorites', icon: 'heart', label: 'Favorites' },
  { key: 'random', icon: 'shuffle', label: 'Random' },
  { key: 'abilities', icon: 'flash', label: 'Abilities' },
  { key: 'evolutions', icon: 'leaf', label: 'Evolutions' },
  { key: 'types', icon: 'star', label: 'Types' },
  { key: 'regions', icon: 'flame', label: 'Regions' },
];

function QuickActionsComponent() {
  const { colors } = useThemeTokens();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Quick Actions</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {QUICK_ACTIONS.map((action) => (
          <QuickActionCard
            key={action.key}
            icon={action.icon}
            label={action.label}
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
