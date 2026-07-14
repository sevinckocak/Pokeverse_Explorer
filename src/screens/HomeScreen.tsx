import { useCallback, useEffect, useMemo } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { fetchPokemonList } from '@/store';
import { DEFAULT_POKEMON_PAGE_SIZE } from '@/store/pokemon/pokemonThunks';
import {
  selectPokemonError,
  selectPokemonList,
  selectPokemonLoading,
} from '@/store/pokemon/pokemonSelectors';
import type { RootStackParamList } from '@/navigation';
import HomeHeader, { HOME_HEADER_COLORS } from '@/components/home/HomeHeader';
import SearchBar from '@/components/common/SearchBar';
import EmptyState from '@/components/common/EmptyState';
import QuickActions from '@/components/home/QuickActions';
import PokemonSection from '@/components/pokemon/PokemonSection';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import { SPACING } from '@/constants/theme';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const tabBarHeight = useBottomTabBarHeight();
  const pokemonList = useAppSelector(selectPokemonList);
  const loading = useAppSelector(selectPokemonLoading);
  const error = useAppSelector(selectPokemonError);
  const {
    searchQuery,
    setSearchQuery,
    isSearching,
    isLoading: isSearchLoading,
    filteredPokemon,
  } = usePokemonSearch(pokemonList);

  // Home only ever features the first page. The underlying list is shared
  // with AllPokemonScreen's pagination, so this only fetches when truly
  // empty — otherwise re-mounting Home would reset progress made there.
  const featuredPokemon = useMemo(
    () => pokemonList.slice(0, DEFAULT_POKEMON_PAGE_SIZE),
    [pokemonList]
  );

  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchPokemonList({ offset: 0 }));
    }
  }, [dispatch, pokemonList.length]);

  const handleSeeAllPress = useCallback(() => {
    navigation.navigate('AllPokemon');
  }, [navigation]);

  const handleCardPress = useCallback(
    (name: string) => {
      navigation.navigate('PokemonDetail', { name });
    },
    [navigation]
  );

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingBottom: tabBarHeight + SPACING.xl }]}
    >
      <HomeHeader />

      <View style={styles.searchBarWrapper}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      <QuickActions />

      {isSearching ? (
        loading || isSearchLoading ? (
          <View style={styles.state}>
            <ActivityIndicator size="large" color={HOME_HEADER_COLORS.accent} />
          </View>
        ) : filteredPokemon.length === 0 ? (
          <EmptyState icon="search-outline" title="No Pokémon found" subtitle="Try another keyword" />
        ) : (
          <PokemonGrid data={filteredPokemon} onCardPress={handleCardPress} scrollEnabled={false} />
        )
      ) : (
        <PokemonSection
          title="Pokemon"
          data={featuredPokemon}
          loading={loading}
          error={error}
          onSeeAllPress={handleSeeAllPress}
          onCardPress={handleCardPress}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: HOME_HEADER_COLORS.background,
  },
  content: {
    flexGrow: 1,
  },
  searchBarWrapper: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  state: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
