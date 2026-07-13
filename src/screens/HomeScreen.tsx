import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
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
import HomeHeader, { HOME_HEADER_COLORS } from '@/components/home/HomeHeader';
import SearchBar from '@/components/common/SearchBar';
import QuickActions from '@/components/home/QuickActions';
import { SPACING } from '@/constants/theme';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const pokemonList = useAppSelector(selectPokemonList);
  const loading = useAppSelector(selectPokemonLoading);
  const error = useAppSelector(selectPokemonError);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

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
            renderItem={({ item }) => (
              <Pressable
                style={styles.item}
                onPress={() => navigation.navigate('PokemonDetail', { name: item.name })}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </Pressable>
            )}
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HOME_HEADER_COLORS.background,
  },
  item: {
    padding: 16,
  },
  itemText: {
    color: HOME_HEADER_COLORS.title,
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
