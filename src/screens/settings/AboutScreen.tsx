import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import ScreenHeader from "@/components/common/ScreenHeader";
import SettingsInfoSection from "@/components/settings/SettingsInfoSection";
import { RADIUS, SPACING } from "@/constants/theme";
import type { RootStackParamList } from "@/navigation";

type AboutNavigationProp = NativeStackNavigationProp<RootStackParamList, "About">;

const APP_VERSION = "1.0.0";
const LOGO_SIZE = 72;
const LOGO_ICON_SIZE = 34;
const BADGE_ICON_SIZE = 16;

export default function AboutScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<AboutNavigationProp>();
  const { colors } = useThemeTokens();
  const year = new Date().getFullYear();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title={t("settings.about")}
        subtitle={t("about.subtitle")}
        icon="chevron-back"
        onIconPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View
            style={[
              styles.logo,
              { backgroundColor: colors.surfaceSecondary, borderColor: colors.border },
            ]}
          >
            <Ionicons name="apps" size={LOGO_ICON_SIZE} color={colors.accent} />
          </View>
          <Text style={[styles.appName, { color: colors.textPrimary }]}>
            {t("about.appName")}
          </Text>
          <Text style={[styles.version, { color: colors.textSecondary }]}>
            {t("settings.version", { version: APP_VERSION })}
          </Text>

          <View style={styles.badgeRow}>
            <View
              style={[styles.badge, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Ionicons name="logo-react" size={BADGE_ICON_SIZE} color={colors.accent} />
              <Text style={[styles.badgeText, { color: colors.textPrimary }]}>
                {t("about.platform")}
              </Text>
            </View>
            <View
              style={[styles.badge, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Ionicons name="flash-outline" size={BADGE_ICON_SIZE} color={colors.accent} />
              <Text style={[styles.badgeText, { color: colors.textPrimary }]}>
                {t("about.poweredBy")}
              </Text>
            </View>
          </View>
        </View>

        <SettingsInfoSection title={t("about.descriptionTitle")} body={t("about.description")} />

        <Text style={[styles.copyright, { color: colors.textSecondary }]}>
          {t("about.copyright", { year })}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  hero: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  appName: {
    fontSize: 20,
    fontWeight: "800",
  },
  version: {
    marginTop: SPACING.xs,
    fontSize: 13,
  },
  badgeRow: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginTop: SPACING.lg,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  copyright: {
    marginTop: SPACING.sm,
    textAlign: "center",
    fontSize: 12,
  },
});
