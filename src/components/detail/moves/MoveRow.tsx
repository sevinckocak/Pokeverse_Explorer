import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import { SPACING } from "@/constants/theme";
import { capitalize } from "@/utils/string";

interface MoveRowProps {
  name: string;
}

const BULLET_SIZE = 8;

function MoveRowComponent({ name }: MoveRowProps) {
  const { colors } = useThemeTokens();
  const displayName = capitalize(name.replace(/-/g, " "));

  return (
    <View style={styles.row}>
      <Ionicons name="ellipse" size={BULLET_SIZE} color={colors.accent} />
      <Text style={[styles.name, { color: colors.textPrimary }]}>{displayName}</Text>
    </View>
  );
}

export default memo(MoveRowComponent);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
  },
});
