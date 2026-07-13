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
import HomeHeader from '@/components/home/HomeHeader';
import SearchBar from '@/components/common/SearchBar';
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

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text>{error}</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={pokemonList}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Pressable
                style={styles.item}
                onPress={() => navigation.navigate('PokemonDetail', { name: item.name })}
              >
                <Text>{item.name}</Text>
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
  },
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 16,
  },
  searchBarWrapper: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
});
