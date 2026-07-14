import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchPokemonList } from "@/store";
import { DEFAULT_POKEMON_PAGE_SIZE } from "@/store/pokemon/pokemonThunks";
import {
  selectPokemonError,
  selectPokemonList,
  selectPokemonLoading,
} from "@/store/pokemon/pokemonSelectors";
import type { RootStackParamList } from "@/navigation";
import type { PokemonListItem } from "@/types";
import HomeHeader, { HOME_HEADER_COLORS } from "@/components/home/HomeHeader";
import SearchBar from "@/components/common/SearchBar";
import QuickActions from "@/components/home/QuickActions";
import PokemonSection from "@/components/pokemon/PokemonSection";
import PokemonCard from "@/components/pokemon/PokemonCard";
import { SPACING } from "@/constants/theme";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const GRID_COLUMNS = 2;
const HORIZONTAL_PADDING = SPACING.lg;
const COLUMN_GAP = SPACING.md;
const EMPTY_STATE_ICON_SIZE = 48;

function SearchEmptyState() {
  return (
    <View style={styles.emptyState}>
      <Ionicons
        name="search-outline"
        size={EMPTY_STATE_ICON_SIZE}
        color={HOME_HEADER_COLORS.subtitle}
      />
      <Text style={styles.emptyTitle}>No Pokémon found</Text>
      <Text style={styles.emptySubtitle}>Try another keyword</Text>
    </View>
  );
}

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const tabBarHeight = useBottomTabBarHeight();
  const { width } = useWindowDimensions();
  const pokemonList = useAppSelector(selectPokemonList);
  const loading = useAppSelector(selectPokemonLoading);
  const error = useAppSelector(selectPokemonError);
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const cardWidth =
    (width - HORIZONTAL_PADDING * 2 - COLUMN_GAP * (GRID_COLUMNS - 1)) /
    GRID_COLUMNS;

  // Home only ever features the first page. The underlying list is shared
  // with AllPokemonScreen's pagination, so this only fetches when truly
  // empty — otherwise re-mounting Home would reset progress made there.
  const featuredPokemon = useMemo(
    () => pokemonList.slice(0, DEFAULT_POKEMON_PAGE_SIZE),
    [pokemonList],
  );

  const filteredPokemon = useMemo(
    () =>
      pokemonList.filter((item) =>
        item.name.toLowerCase().includes(normalizedQuery),
      ),
    [pokemonList, normalizedQuery],
  );

  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchPokemonList({ offset: 0 }));
    }
  }, [dispatch, pokemonList.length]);

  const handleSeeAllPress = useCallback(() => {
    navigation.navigate("AllPokemon");
  }, [navigation]);

  const handleCardPress = useCallback(
    (name: string) => {
      navigation.navigate("PokemonDetail", { name });
    },
    [navigation],
  );

  const renderSearchResult = useCallback(
    ({ item }: { item: PokemonListItem }) => (
      <PokemonCard pokemon={item} width={cardWidth} onPress={handleCardPress} />
    ),
    [cardWidth, handleCardPress],
  );

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: tabBarHeight + SPACING.xl },
      ]}
    >
      <HomeHeader />

      <View style={styles.searchBarWrapper}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      <QuickActions />

      {isSearching ? (
        loading ? (
          <View style={styles.state}>
            <ActivityIndicator size="large" color={HOME_HEADER_COLORS.accent} />
          </View>
        ) : filteredPokemon.length === 0 ? (
          <SearchEmptyState />
        ) : (
          <FlatList
            data={filteredPokemon}
            keyExtractor={(item) => item.name}
            renderItem={renderSearchResult}
            numColumns={GRID_COLUMNS}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.searchListContent}
            scrollEnabled={false}
          />
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
  searchListContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    gap: SPACING.md,
  },
  row: {
    gap: SPACING.md,
  },
  state: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  emptyTitle: {
    marginTop: SPACING.md,
    fontSize: 16,
    fontWeight: "700",
    color: HOME_HEADER_COLORS.title,
  },
  emptySubtitle: {
    marginTop: SPACING.xs,
    fontSize: 13,
    color: HOME_HEADER_COLORS.subtitle,
  },
});
