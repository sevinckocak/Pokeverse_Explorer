import { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAppSelector } from '@/hooks/useRedux';
import { selectFavorites } from '@/store/favorites/favoritesSelectors';
import { HOME_HEADER_COLORS } from '@/components/home/HomeHeader';
import ScreenHeader from '@/components/common/ScreenHeader';
import EmptyState from '@/components/common/EmptyState';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import { SPACING } from '@/constants/theme';
import type { RootStackParamList } from '@/navigation';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function FavoritesScreen() {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const tabBarHeight = useBottomTabBarHeight();

  // Favorites now stores full PokemonListItem objects, so the screen renders
  // directly from Redux instead of filtering the (paginated, first-page-only)
  // shared pokemon list — that filter dropped favorites added from later
  // pages once the app restarted and pokemonList reset to page one.
  const favoritePokemon = useAppSelector(selectFavorites);

  const favoritesCountLabel = useMemo(
    () => (favoritePokemon.length > 0 ? `${favoritePokemon.length} Pokémon saved` : undefined),
    [favoritePokemon.length]
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

  return (
    <View style={styles.root}>
      <ScreenHeader
        title="Favorites"
        subtitle="Your saved Pokémon collection."
        icon="heart"
        info={favoritesCountLabel}
      />

      {favoritePokemon.length === 0 ? (
        <View style={styles.center}>
          <EmptyState
            icon="heart-outline"
            title="No favorites yet"
            subtitle="Tap the heart icon on any Pokémon to add it here."
          />
        </View>
      ) : (
        <PokemonGrid
          data={favoritePokemon}
          onCardPress={handleCardPress}
          contentContainerStyle={gridContentStyle}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: HOME_HEADER_COLORS.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
