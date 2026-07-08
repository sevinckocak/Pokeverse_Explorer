import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "@/hooks/useRedux";
import {
  selectEvolutionChain,
  selectEvolutionError,
  selectEvolutionLoading,
} from "@/store/evolution/evolutionSelectors";
import EvolutionNode from "@/components/pokemon/EvolutionNode";

export default function PokemonEvolution() {
  const evolutionChain = useAppSelector(selectEvolutionChain);
  const loading = useAppSelector(selectEvolutionLoading);
  const error = useAppSelector(selectEvolutionError);

  if (evolutionChain === null && !loading && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evolution Chain</Text>
      {loading ? <Text>Loading evolution chain...</Text> : null}
      {error ? <Text>{error}</Text> : null}
      {evolutionChain ? <EvolutionNode node={evolutionChain.chain} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
});
