import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import ScreenHeader from "@/components/common/ScreenHeader";
import SettingsInfoSection from "@/components/settings/SettingsInfoSection";
import { SPACING } from "@/constants/theme";
import type { RootStackParamList } from "@/navigation";

type PrivacyPolicyNavigationProp = NativeStackNavigationProp<RootStackParamList, "PrivacyPolicy">;

const SECTION_KEYS = [
  "collection",
  "localStorage",
  "favorites",
  "language",
  "theme",
  "noAccount",
  "noAnalytics",
  "contact",
] as const;

export default function PrivacyPolicyScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<PrivacyPolicyNavigationProp>();
  const { colors } = useThemeTokens();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title={t("settings.privacyPolicy")}
        subtitle={t("privacyPolicy.subtitle")}
        icon="chevron-back"
        onIconPress={() => navigation.goBack()}
        info={t("privacyPolicy.lastUpdated")}
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={[styles.intro, { color: colors.textSecondary }]}>
          {t("privacyPolicy.intro")}
        </Text>

        {SECTION_KEYS.map((key) => (
          <SettingsInfoSection
            key={key}
            title={t(`privacyPolicy.sections.${key}.title`)}
            body={t(`privacyPolicy.sections.${key}.body`)}
          />
        ))}
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
  intro: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
});
