import { StyleSheet, Text, View } from "react-native";
import type { PokemonSpecies as PokemonSpeciesType } from "@/types";

interface PokemonSpeciesProps {
  species: PokemonSpeciesType | null;
  loading: boolean;
  error: string | null;
}

export default function PokemonSpecies({
  species,
  loading,
  error,
}: PokemonSpeciesProps) {
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading species...</Text>
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

  if (!species) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`Habitat: ${
        species.habitat !== null ? species.habitat.name : "Unknown"
      }`}</Text>
      <Text style={styles.label}>{`Color: ${species.color.name}`}</Text>
      <Text style={styles.label}>{`Capture Rate: ${species.capture_rate}`}</Text>
      <Text style={styles.label}>{`Base Happiness: ${species.base_happiness}`}</Text>
      <Text style={styles.label}>{`Legendary: ${species.is_legendary ? "Yes" : "No"}`}</Text>
      <Text style={styles.label}>{`Mythical: ${species.is_mythical ? "Yes" : "No"}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 16,
  },
  label: {
    fontSize: 16,
  },
});
