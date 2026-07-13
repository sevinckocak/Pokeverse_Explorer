import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { RADIUS, SPACING } from "@/constants/theme";

interface HomeHeaderProps {
  onNotificationPress?: () => void;
}

const HOME_HEADER_COLORS = {
  background: "#141B2D",
  accent: "#5B7FFF",
  title: "#FFFFFF",
  subtitle: "rgba(255, 255, 255, 0.64)",
  glass: "rgba(255, 255, 255, 0.1)",
  glassBorder: "rgba(255, 255, 255, 0.18)",
} as const;

const NOTIFICATION_BUTTON_SIZE = 48;
const NOTIFICATION_ICON_SIZE = 22;
const NOTIFICATION_BADGE_SIZE = 10;

export default function HomeHeader({ onNotificationPress }: HomeHeaderProps) {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Discover Pokémon</Text>
          <Text style={styles.subtitle}>
            Explore Pokémon, abilities, evolutions and more.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          activeOpacity={0.7}
          onPress={onNotificationPress}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <Ionicons
            name="notifications-outline"
            size={NOTIFICATION_ICON_SIZE}
            color={HOME_HEADER_COLORS.title}
          />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: HOME_HEADER_COLORS.background,
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    backgroundColor: HOME_HEADER_COLORS.background,
  },
  textBlock: {
    flex: 1,
    marginRight: SPACING.md,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: HOME_HEADER_COLORS.title,
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: SPACING.xs,
    fontSize: 14,
    lineHeight: 20,
    color: HOME_HEADER_COLORS.subtitle,
  },
  notificationButton: {
    width: NOTIFICATION_BUTTON_SIZE,
    height: NOTIFICATION_BUTTON_SIZE,
    borderRadius: RADIUS.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: HOME_HEADER_COLORS.glass,
    borderWidth: 1,
    borderColor: HOME_HEADER_COLORS.glassBorder,
  },
  notificationBadge: {
    position: "absolute",
    top: 10,
    right: 11,
    width: NOTIFICATION_BADGE_SIZE,
    height: NOTIFICATION_BADGE_SIZE,
    borderRadius: RADIUS.pill,
    backgroundColor: HOME_HEADER_COLORS.accent,
    borderWidth: 1.5,
    borderColor: HOME_HEADER_COLORS.background,
  },
});
