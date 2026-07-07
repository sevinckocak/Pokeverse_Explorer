import { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchPokemonList } from '@/store/pokemon/pokemonSlice';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { pokemonList, loading, error } = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
