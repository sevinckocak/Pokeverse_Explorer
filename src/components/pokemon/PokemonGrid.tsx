import { memo, useCallback } from 'react';
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import PokemonCard from '@/components/pokemon/PokemonCard';
import { SPACING } from '@/constants/theme';
import type { PokemonListItem } from '@/types';

interface PokemonGridProps {
  data: PokemonListItem[];
  onCardPress: (name: string) => void;
  scrollEnabled?: boolean;
}

const GRID_COLUMNS = 2;
const HORIZONTAL_PADDING = SPACING.lg;
const COLUMN_GAP = SPACING.md;

function PokemonGridComponent({ data, onCardPress, scrollEnabled = true }: PokemonGridProps) {
  const { width } = useWindowDimensions();
  const cardWidth =
    (width - HORIZONTAL_PADDING * 2 - COLUMN_GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS;

  const renderItem = useCallback(
    ({ item }: { item: PokemonListItem }) => (
      <PokemonCard pokemon={item} width={cardWidth} onPress={onCardPress} />
    ),
    [cardWidth, onCardPress]
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      numColumns={GRID_COLUMNS}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      scrollEnabled={scrollEnabled}
    />
  );
}

export default memo(PokemonGridComponent);

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: HORIZONTAL_PADDING,
    gap: SPACING.md,
  },
  row: {
    gap: SPACING.md,
  },
});
