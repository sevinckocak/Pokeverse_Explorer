import { useCallback, useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { fetchPokemonList } from '@/store';
import { selectPokemonList } from '@/store/pokemon/pokemonSelectors';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import SearchBar from '@/components/common/SearchBar';
import EmptyState from '@/components/common/EmptyState';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import RecentSearches from '@/components/search/RecentSearches';
import TrendingPokemon from '@/components/search/TrendingPokemon';
import BrowseByType from '@/components/search/BrowseByType';
import { SPACING } from '@/constants/theme';
import type { PokemonTypeName } from '@/constants/pokemonTheme';
import type { RootStackParamList } from '@/navigation';

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function SearchScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const tabBarHeight = useBottomTabBarHeight();
  const { colors } = useThemeTokens();
  const pokemonList = useAppSelector(selectPokemonList);
  const {
    searchQuery,
    setSearchQuery,
    isSearching,
    isLoading: isSearchLoading,
    filteredPokemon,
  } = usePokemonSearch(pokemonList);

  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchPokemonList({ offset: 0 }));
    }
  }, [dispatch, pokemonList.length]);

  const handleCardPress = useCallback(
    (name: string) => {
      navigation.navigate('PokemonDetail', { name });
    },
    [navigation]
  );

  const handleSeeAllPress = useCallback(() => {
    navigation.navigate('AllPokemon');
  }, [navigation]);

  const handleTypePress = useCallback((type: PokemonTypeName) => {
    // No "browse by type" flow exists yet; stubbed so this stays wireable
    // later without touching BrowseByType or this screen's composition.
    console.log(`Browse by type pressed: ${type}`);
  }, []);

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.root}
        contentContainerStyle={[styles.content, { paddingBottom: tabBarHeight + SPACING.xl }]}
      >
        <View style={styles.searchBarWrapper}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} autoFocus />
        </View>

        {isSearching ? (
          isSearchLoading ? (
            <View style={styles.state}>
              <ActivityIndicator size="large" color={colors.accent} />
            </View>
          ) : filteredPokemon.length === 0 ? (
            <EmptyState
              icon="search-outline"
              title="No Pokémon found"
              subtitle="Try another keyword"
            />
          ) : (
            <PokemonGrid data={filteredPokemon} onCardPress={handleCardPress} scrollEnabled={false} />
          )
        ) : (
          <>
            <RecentSearches onQueryPress={setSearchQuery} />
            <TrendingPokemon onCardPress={handleCardPress} onSeeAllPress={handleSeeAllPress} />
            <BrowseByType onTypePress={handleTypePress} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  root: {
    flex: 1,
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
