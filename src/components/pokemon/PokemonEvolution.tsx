import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "@/hooks/useRedux";
import {
  selectEvolutionChain,
  selectEvolutionError,
  selectEvolutionLoading,
} from "@/store/evolution/evolutionSelectors";
import type { EvolutionChainNode } from "@/types";

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

interface EvolutionNodeProps {
  node: EvolutionChainNode;
}

function EvolutionNode({ node }: EvolutionNodeProps) {
  return (
    <View style={styles.node}>
      <Text style={styles.name}>{capitalize(node.species.name)}</Text>
      {node.evolves_to.map((child) => (
        <View key={child.species.name} style={styles.branch}>
          <Text style={styles.arrow}>↓</Text>
          <EvolutionNode node={child} />
        </View>
      ))}
    </View>
  );
}

export default function PokemonEvolution() {
  const evolutionChain = useAppSelector(selectEvolutionChain);
  const loading = useAppSelector(selectEvolutionLoading);
  const error = useAppSelector(selectEvolutionError);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading evolution chain...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (evolutionChain === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <EvolutionNode node={evolutionChain.chain} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 16,
  },
  node: {
    alignItems: "center",
  },
  branch: {
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  arrow: {
    fontSize: 16,
    marginVertical: 4,
  },
});
