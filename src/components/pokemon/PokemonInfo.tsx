import { StyleSheet, Text, View } from "react-native";

interface PokemonInfoProps {
  height: number;
  weight: number;
}

export default function PokemonInfo({ height, weight }: PokemonInfoProps) {
  const displayHeight = `${(height / 10).toFixed(1)} m`;
  const displayWeight = `${(weight / 10).toFixed(1)} kg`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`Height: ${displayHeight}`}</Text>
      <Text style={styles.label}>{`Weight: ${displayWeight}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  label: {
    fontSize: 16,
  },
});
