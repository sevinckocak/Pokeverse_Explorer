import { StyleSheet, Text, View } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation';

type PokemonDetailRouteProp = RouteProp<RootStackParamList, 'PokemonDetail'>;

export default function PokemonDetailScreen() {
  const route = useRoute<PokemonDetailRouteProp>();
  const { name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Detail</Text>
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
