import { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAppSelector } from '@/hooks/useRedux';
import { selectFavorites } from '@/store/favorites/favoritesSelectors';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import ScreenHeader from '@/components/common/ScreenHeader';
import EmptyState from '@/components/common/EmptyState';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import { SPACING } from '@/constants/theme';
import type { RootStackParamList } from '@/navigation';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function FavoritesScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const tabBarHeight = useBottomTabBarHeight();
  const { colors } = useThemeTokens();

  // Favorites now stores full PokemonListItem objects, so the screen renders
  // directly from Redux instead of filtering the (paginated, first-page-only)
  // shared pokemon list — that filter dropped favorites added from later
  // pages once the app restarted and pokemonList reset to page one.
  const favoritePokemon = useAppSelector(selectFavorites);

  const favoritesCountLabel = useMemo(
    () =>
      favoritePokemon.length > 0
        ? t('favorites.count', { count: favoritePokemon.length })
        : undefined,
    [favoritePokemon.length, t]
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
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title={t('favorites.title')}
        subtitle={t('favorites.subtitle')}
        icon="heart"
        info={favoritesCountLabel}
      />

      {favoritePokemon.length === 0 ? (
        <View style={styles.center}>
          <EmptyState
            icon="heart-outline"
            title={t('favorites.emptyTitle')}
            subtitle={t('favorites.emptySubtitle')}
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
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
