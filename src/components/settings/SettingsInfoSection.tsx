import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { RADIUS, SPACING } from '@/constants/theme';

interface SettingsInfoSectionProps {
  title: string;
  body: string;
}

// Reusable title/body card for static legal and informational content
// (About, Privacy Policy, Terms of Service) — mirrors SettingsSection's
// card styling so these read-only screens stay visually consistent with
// the interactive Settings list, without repeating that layout per screen.
function SettingsInfoSectionComponent({ title, body }: SettingsInfoSectionProps) {
  const { colors } = useThemeTokens();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[styles.body, { color: colors.textSecondary }]}>{body}</Text>
    </View>
  );
}

export default memo(SettingsInfoSectionComponent);

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  body: {
    fontSize: 13,
    lineHeight: 20,
  },
});
