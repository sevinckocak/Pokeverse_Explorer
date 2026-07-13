import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchPokemonList } from '@/store';
import {
  selectPokemonError,
  selectPokemonList,
  selectPokemonLoading,
} from '@/store/pokemon/pokemonSelectors';
import type { RootStackParamList } from '@/navigation';
import type { PokemonListItem } from '@/types';
import HomeHeader, { HOME_HEADER_COLORS } from '@/components/home/HomeHeader';
import SearchBar from '@/components/common/SearchBar';
import QuickActions from '@/components/home/QuickActions';
import PokemonCard from '@/components/pokemon/PokemonCard';
import { SPACING } from '@/constants/theme';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const GRID_COLUMNS = 2;

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { width } = useWindowDimensions();
  const pokemonList = useAppSelector(selectPokemonList);
  const loading = useAppSelector(selectPokemonLoading);
  const error = useAppSelector(selectPokemonError);
  const [searchQuery, setSearchQuery] = useState('');

  const cardWidth = (width - SPACING.lg * 2 - SPACING.md * (GRID_COLUMNS - 1)) / GRID_COLUMNS;

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

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

  return (
    <View style={styles.root}>
      <HomeHeader />

      <View style={styles.searchBarWrapper}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      <QuickActions />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            style={styles.list}
            data={pokemonList}
            keyExtractor={(item) => item.name}
            numColumns={GRID_COLUMNS}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: HOME_HEADER_COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: HOME_HEADER_COLORS.background,
  },
  list: {
    backgroundColor: HOME_HEADER_COLORS.background,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },
  row: {
    gap: SPACING.md,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HOME_HEADER_COLORS.background,
  },
  errorText: {
    color: HOME_HEADER_COLORS.title,
  },
  searchBarWrapper: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: HOME_HEADER_COLORS.background,
  },
});
