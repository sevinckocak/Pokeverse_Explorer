import { useEffect } from 'react';
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

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const pokemonList = useAppSelector(selectPokemonList);
  const loading = useAppSelector(selectPokemonLoading);
  const error = useAppSelector(selectPokemonError);

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
          <Pressable
            style={styles.item}
            onPress={() => navigation.navigate('PokemonDetail', { name: item.name })}
          >
            <Text>{item.name}</Text>
          </Pressable>
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
