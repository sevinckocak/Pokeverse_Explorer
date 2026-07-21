import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import ScreenHeader from "@/components/common/ScreenHeader";
import SettingsInfoSection from "@/components/settings/SettingsInfoSection";
import { SPACING } from "@/constants/theme";
import type { RootStackParamList } from "@/navigation";

type TermsOfServiceNavigationProp = NativeStackNavigationProp<RootStackParamList, "TermsOfService">;

const SECTION_KEYS = [
  "educationalUse",
  "attribution",
  "noWarranty",
  "responsibilities",
  "intellectualProperty",
  "liability",
] as const;

export default function TermsOfServiceScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<TermsOfServiceNavigationProp>();
  const { colors } = useThemeTokens();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title={t("settings.termsOfService")}
        subtitle={t("termsOfService.subtitle")}
        icon="chevron-back"
        onIconPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={[styles.intro, { color: colors.textSecondary }]}>
          {t("termsOfService.intro")}
        </Text>

        {SECTION_KEYS.map((key) => (
          <SettingsInfoSection
            key={key}
            title={t(`termsOfService.sections.${key}.title`)}
            body={t(`termsOfService.sections.${key}.body`)}
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
