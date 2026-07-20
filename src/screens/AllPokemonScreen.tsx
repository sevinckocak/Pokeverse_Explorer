import { useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchPokemonList } from '@/store';
import {
  selectPokemonError,
  selectPokemonHasMore,
  selectPokemonList,
  selectPokemonLoading,
  selectPokemonLoadingMore,
} from '@/store/pokemon/pokemonSelectors';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import PokemonCard from '@/components/pokemon/PokemonCard';
import { SPACING } from '@/constants/theme';
import type { RootStackParamList } from '@/navigation';
import type { PokemonListItem } from '@/types';

type AllPokemonNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AllPokemon'>;

const GRID_COLUMNS = 2;
const HORIZONTAL_PADDING = SPACING.lg;
const COLUMN_GAP = SPACING.md;
const END_REACHED_THRESHOLD = 0.5;
const INITIAL_NUM_TO_RENDER = 10;
const MAX_TO_RENDER_PER_BATCH = 10;
const WINDOW_SIZE = 7;

export default function AllPokemonScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AllPokemonNavigationProp>();
  const { colors } = useThemeTokens();
  const { width } = useWindowDimensions();
  const pokemonList = useAppSelector(selectPokemonList);
  const loading = useAppSelector(selectPokemonLoading);
  const loadingMore = useAppSelector(selectPokemonLoadingMore);
  const hasMore = useAppSelector(selectPokemonHasMore);
  const error = useAppSelector(selectPokemonError);

  const cardWidth =
    (width - HORIZONTAL_PADDING * 2 - COLUMN_GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS;

  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchPokemonList({ offset: 0 }));
    }
  }, [dispatch, pokemonList.length]);

  const handleLoadMore = useCallback(() => {
    if (loading || loadingMore || !hasMore) {
      return;
    }

    dispatch(fetchPokemonList({ offset: pokemonList.length }));
  }, [dispatch, loading, loadingMore, hasMore, pokemonList.length]);

  const handleCardPress = useCallback(
    (name: string) => {
      navigation.navigate('PokemonDetail', { name });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: PokemonListItem }) => (
      <PokemonCard pokemon={item} width={cardWidth} onPress={handleCardPress} />
    ),
    [cardWidth, handleCardPress]
  );

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textPrimary }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        numColumns={GRID_COLUMNS}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={END_REACHED_THRESHOLD}
        initialNumToRender={INITIAL_NUM_TO_RENDER}
        maxToRenderPerBatch={MAX_TO_RENDER_PER_BATCH}
        windowSize={WINDOW_SIZE}
        removeClippedSubviews
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color={colors.accent} />
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
  },
  row: {
    gap: SPACING.md,
  },
  footer: {
    paddingVertical: SPACING.lg,
  },
});
