import { useCallback, useEffect, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchPokemonList } from '@/store';
import { selectPokemonList, selectPokemonLoading } from '@/store/pokemon/pokemonSelectors';
import { selectFavoriteIds } from '@/store/favorites/favoritesSelectors';
import { HOME_HEADER_COLORS } from '@/components/home/HomeHeader';
import EmptyState from '@/components/common/EmptyState';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import { SPACING } from '@/constants/theme';
import type { RootStackParamList } from '@/navigation';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function FavoritesScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const tabBarHeight = useBottomTabBarHeight();
  const favoriteIds = useAppSelector(selectFavoriteIds);
  const pokemonList = useAppSelector(selectPokemonList);
  const loading = useAppSelector(selectPokemonLoading);

  // Same "fetch only when empty" pattern as Home/Search: Favorites reads
  // from the same shared pokemon list rather than owning its own copy, but
  // still needs to guarantee that list exists if this is the first screen
  // the user ever opens.
  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchPokemonList({ offset: 0 }));
    }
  }, [dispatch, pokemonList.length]);

  const favoritePokemon = useMemo(
    () => pokemonList.filter((pokemon) => favoriteIds.includes(pokemon.name)),
    [pokemonList, favoriteIds]
  );

  const handleCardPress = useCallback(
    (name: string) => {
      navigation.navigate('PokemonDetail', { name });
    },
    [navigation]
  );

  const gridContentStyle = useMemo(
    () => ({ paddingTop: SPACING.lg, paddingBottom: tabBarHeight + SPACING.xl }),
    [tabBarHeight]
  );

  if (loading) {
    return (
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={HOME_HEADER_COLORS.accent} />
        </View>
      </SafeAreaView>
    );
  }

  if (favoritePokemon.length === 0) {
    return (
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.center}>
          <EmptyState
            icon="heart-outline"
            title="No favorites yet"
            subtitle="Tap the heart icon on any Pokémon to add it here."
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <PokemonGrid
        data={favoritePokemon}
        onCardPress={handleCardPress}
        contentContainerStyle={gridContentStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: HOME_HEADER_COLORS.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
