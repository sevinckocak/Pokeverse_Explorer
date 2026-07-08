import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { capitalize } from "@/utils/string";
import type { EvolutionChainNode } from "@/types";

interface EvolutionNodeProps {
  node: EvolutionChainNode;
}

function EvolutionNodeComponent({ node }: EvolutionNodeProps) {
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

const EvolutionNode = memo(EvolutionNodeComponent);

export default EvolutionNode;

const styles = StyleSheet.create({
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
