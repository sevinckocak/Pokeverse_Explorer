import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { toggleTheme, setLanguage } from '@/store/settings/settingsSlice';
import { selectLanguage } from '@/store/settings/settingsSelectors';
import { LANGUAGE_LABELS } from '@/localization';
import type { SupportedLanguage } from '@/localization';
import ScreenHeader from '@/components/common/ScreenHeader';
import SettingsSection from '@/components/settings/SettingsSection';
import SettingsItem from '@/components/settings/SettingsItem';
import LanguagePickerModal from '@/components/settings/LanguagePickerModal';
import { SPACING } from '@/constants/theme';

const APP_VERSION = '1.0.0';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const tabBarHeight = useBottomTabBarHeight();
  const dispatch = useAppDispatch();
  const { colors, isDark } = useThemeTokens();
  const language = useAppSelector(selectLanguage);
  const [isLanguagePickerVisible, setIsLanguagePickerVisible] = useState(false);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleSelectLanguage = (code: SupportedLanguage) => {
    dispatch(setLanguage(code));
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title={t('settings.title')}
        subtitle={t('settings.subtitle')}
        icon="settings-outline"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: tabBarHeight + SPACING.xl }]}
      >
        <SettingsSection title={t('settings.appearance')}>
          <SettingsItem
            icon="moon-outline"
            title={t('settings.darkMode')}
            showSwitch
            switchValue={isDark}
            onSwitchChange={handleToggleTheme}
          />
        </SettingsSection>

        <SettingsSection title={t('settings.language')}>
          <SettingsItem
            icon="language-outline"
            title={t('settings.language')}
            value={LANGUAGE_LABELS[language as SupportedLanguage]}
            showChevron
            onPress={() => setIsLanguagePickerVisible(true)}
          />
        </SettingsSection>

        <SettingsSection title={t('settings.notifications')}>
          <SettingsItem
            icon="notifications-outline"
            title={t('settings.notifications')}
            subtitle={t('settings.comingSoon')}
            showSwitch
            switchValue={false}
            disabled
          />
        </SettingsSection>

        <SettingsSection title={t('settings.general')}>
          <SettingsItem
            icon="information-circle-outline"
            title={t('settings.about')}
            showChevron
            disabled
          />
          <SettingsItem
            icon="shield-checkmark-outline"
            title={t('settings.privacyPolicy')}
            showChevron
            disabled
          />
          <SettingsItem
            icon="document-text-outline"
            title={t('settings.termsOfService')}
            showChevron
            disabled
          />
        </SettingsSection>

        <SettingsSection title={t('settings.support')}>
          <SettingsItem icon="star-outline" title={t('settings.rateApp')} showChevron disabled />
          <SettingsItem
            icon="mail-outline"
            title={t('settings.contactSupport')}
            showChevron
            disabled
          />
        </SettingsSection>

        <View style={styles.footer}>
          <Text style={[styles.footerTitle, { color: colors.textPrimary }]}>
            {t('settings.footerName')}
          </Text>
          <Text style={[styles.footerVersion, { color: colors.textSecondary }]}>
            {t('settings.version', { version: APP_VERSION })}
          </Text>
        </View>
      </ScrollView>

      <LanguagePickerModal
        visible={isLanguagePickerVisible}
        selectedLanguage={language as SupportedLanguage}
        onSelectLanguage={handleSelectLanguage}
        onClose={() => setIsLanguagePickerVisible(false)}
      />
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
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.md,
    gap: SPACING.xs,
  },
  footerTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  footerVersion: {
    marginTop: 2,
    fontSize: 12,
  },
});
