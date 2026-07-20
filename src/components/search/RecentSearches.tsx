import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { RADIUS, SPACING } from '@/constants/theme';

interface RecentSearchesProps {
  onQueryPress: (query: string) => void;
}

function RecentSearchesComponent({ onQueryPress }: RecentSearchesProps) {
  const { t } = useTranslation();
  const { colors } = useThemeTokens();
  const { recentSearches } = useRecentSearches();

  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        {t('search.recentSearches')}
      </Text>
      <View style={styles.chipRow}>
        {recentSearches.map((query) => (
          <Pressable
            key={query}
            style={[styles.chip, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => onQueryPress(query)}
            accessibilityRole="button"
            accessibilityLabel={`Search ${query}`}
          >
            <Text style={[styles.chipLabel, { color: colors.textPrimary }]}>{query}</Text>
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
    borderWidth: 1,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
});
