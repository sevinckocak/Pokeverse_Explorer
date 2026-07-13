import { memo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { HOME_HEADER_COLORS } from '@/components/home/HomeHeader';
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>

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
    color: HOME_HEADER_COLORS.title,
  },
  scrollContent: {
    flexDirection: 'row',
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: SPACING.md,
    gap: ITEM_GAP,
  },
});
