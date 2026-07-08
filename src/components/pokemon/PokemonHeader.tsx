import { StyleSheet, Text, View } from "react-native";

interface PokemonHeaderProps {
  name: string;
  id: number;
}

export default function PokemonHeader({ name, id }: PokemonHeaderProps) {
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{displayName}</Text>
      <Text style={styles.id}>{`#${id}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  id: {
    fontSize: 16,
    color: "#666",
  },
});
