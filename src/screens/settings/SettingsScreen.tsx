import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { HOME_HEADER_COLORS } from '@/components/home/HomeHeader';
import ScreenHeader from '@/components/common/ScreenHeader';
import SettingsSection from '@/components/settings/SettingsSection';
import SettingsItem from '@/components/settings/SettingsItem';
import { SPACING } from '@/constants/theme';

const APP_VERSION = '1.0.0';

export default function SettingsScreen() {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.root}>
      <ScreenHeader
        title="Settings"
        subtitle="Customize your app experience."
        icon="settings-outline"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: tabBarHeight + SPACING.xl }]}
      >
        <SettingsSection title="Appearance">
          <SettingsItem
            icon="moon-outline"
            title="Dark Mode"
            subtitle="Coming soon"
            showSwitch
            switchValue={false}
            disabled
          />
        </SettingsSection>

        <SettingsSection title="Language">
          <SettingsItem
            icon="language-outline"
            title="Language"
            subtitle="Coming soon"
            value="English"
            showChevron
            disabled
          />
        </SettingsSection>

        <SettingsSection title="Notifications">
          <SettingsItem
            icon="notifications-outline"
            title="Notifications"
            subtitle="Coming soon"
            showSwitch
            switchValue={false}
            disabled
          />
        </SettingsSection>

        <SettingsSection title="General">
          <SettingsItem icon="information-circle-outline" title="About" showChevron disabled />
          <SettingsItem
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            showChevron
            disabled
          />
          <SettingsItem
            icon="document-text-outline"
            title="Terms of Service"
            showChevron
            disabled
          />
        </SettingsSection>

        <SettingsSection title="Support">
          <SettingsItem icon="star-outline" title="Rate App" showChevron disabled />
          <SettingsItem icon="mail-outline" title="Contact Support" showChevron disabled />
        </SettingsSection>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>PokéVerse Explorer</Text>
          <Text style={styles.footerVersion}>Version {APP_VERSION}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: HOME_HEADER_COLORS.background,
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
    color: HOME_HEADER_COLORS.title,
  },
  footerVersion: {
    marginTop: 2,
    fontSize: 12,
    color: HOME_HEADER_COLORS.subtitle,
  },
});
