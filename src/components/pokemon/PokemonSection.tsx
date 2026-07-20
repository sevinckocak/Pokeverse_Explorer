import { memo, useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import PokemonCard from '@/components/pokemon/PokemonCard';
import { SPACING } from '@/constants/theme';
import { chunk } from '@/utils/array';
import type { PokemonListItem } from '@/types';

interface PokemonSectionProps {
  title: string;
  data: PokemonListItem[];
  loading: boolean;
  error: string | null;
  onSeeAllPress: () => void;
  onCardPress: (name: string) => void;
}

const HORIZONTAL_PADDING = SPACING.lg;
const COLUMN_GAP = SPACING.md;
const ROWS_PER_COLUMN = 2;
const GRID_COLUMNS = 2;

function PokemonSectionComponent({
  title,
  data,
  loading,
  error,
  onSeeAllPress,
  onCardPress,
}: PokemonSectionProps) {
  const { t } = useTranslation();
  const { colors } = useThemeTokens();
  const { width } = useWindowDimensions();
  const cardWidth =
    (width - HORIZONTAL_PADDING * 2 - COLUMN_GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS;

  const columns = useMemo(() => chunk(data, ROWS_PER_COLUMN), [data]);

  const renderColumn = useCallback(
    ({ item: column }: { item: PokemonListItem[] }) => (
      <View style={styles.column}>
        {column.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} width={cardWidth} onPress={onCardPress} />
        ))}
      </View>
    ),
    [cardWidth, onCardPress]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
        <Pressable
          onPress={onSeeAllPress}
          accessibilityRole="button"
          accessibilityLabel={t('common.seeAll')}
        >
          <Text style={[styles.seeAll, { color: colors.accent }]}>{t('common.seeAll')}</Text>
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      ) : error ? (
        <View style={styles.state}>
          <Text style={{ color: colors.textPrimary }}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={columns}
          keyExtractor={(_, index) => `column-${index}`}
          renderItem={renderColumn}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

export default memo(PokemonSectionComponent);

const styles = StyleSheet.create({
  container: {
    paddingBottom: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: HORIZONTAL_PADDING,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    gap: COLUMN_GAP,
  },
  column: {
    gap: SPACING.md,
  },
  state: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
