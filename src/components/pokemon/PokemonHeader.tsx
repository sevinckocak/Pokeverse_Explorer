import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SPACING } from "@/constants/theme";
import { capitalize } from "@/utils/string";

interface PokemonHeaderProps {
  name: string;
  id: number;
}

function PokemonHeaderComponent({ name, id }: PokemonHeaderProps) {
  const displayName = capitalize(name);
  const displayId = `#${id.toString().padStart(3, "0")}`;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{displayName}</Text>
      <View style={styles.idPill}>
        <Text style={styles.id}>{displayId}</Text>
      </View>
    </View>
  );
}

export default memo(PokemonHeaderComponent);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: SPACING.md,
  },
  name: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.4,
    textShadowColor: "rgba(0, 0, 0, 0.18)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  idPill: {
    marginTop: SPACING.xs,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.22)",
  },
  id: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
});
