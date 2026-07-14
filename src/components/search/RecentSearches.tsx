import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HOME_HEADER_COLORS } from '@/components/home/HomeHeader';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { RADIUS, SPACING } from '@/constants/theme';

interface RecentSearchesProps {
  onQueryPress: (query: string) => void;
}

function RecentSearchesComponent({ onQueryPress }: RecentSearchesProps) {
  const { recentSearches } = useRecentSearches();

  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Searches</Text>
      <View style={styles.chipRow}>
        {recentSearches.map((query) => (
          <Pressable
            key={query}
            style={styles.chip}
            onPress={() => onQueryPress(query)}
            accessibilityRole="button"
            accessibilityLabel={`Search ${query}`}
          >
            <Text style={styles.chipLabel}>{query}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default memo(RecentSearchesComponent);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: HOME_HEADER_COLORS.title,
    marginBottom: SPACING.md,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  chip: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.pill,
    backgroundColor: HOME_HEADER_COLORS.glass,
    borderWidth: 1,
    borderColor: HOME_HEADER_COLORS.glassBorder,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: HOME_HEADER_COLORS.title,
  },
});
