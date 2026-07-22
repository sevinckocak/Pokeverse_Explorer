import { memo } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { RADIUS, SPACING } from '@/constants/theme';
import type { IoniconName } from '@/types/ionicon';

interface SettingsItemProps {
  icon: IoniconName;
  title: string;
  subtitle?: string;
  value?: string;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  showChevron?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

const ICON_BADGE_SIZE = 36;
const ICON_SIZE = 18;
const CHEVRON_SIZE = 18;
const PRESSED_OPACITY = 0.6;

// Pure display row by default — pass onSwitchChange/onPress once a setting
// is actually wired up (see Dark Mode / Language). Rows without either stay
// non-interactive, same as before.
function SettingsItemComponent({
  icon,
  title,
  subtitle,
  value,
  showSwitch = false,
  switchValue = false,
  onSwitchChange,
  showChevron = false,
  disabled = false,
  onPress,
}: SettingsItemProps) {
  const { colors } = useThemeTokens();

  const content = (
    <>
      <View
        style={[
          styles.iconBadge,
          { backgroundColor: colors.surfaceSecondary, borderColor: colors.border },
        ]}
      >
        <Ionicons name={icon} size={ICON_SIZE} color={colors.textPrimary} />
      </View>

      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
        ) : null}
      </View>

      <View style={styles.trailing}>
        {value ? (
          <Text style={[styles.value, { color: colors.textSecondary }]}>{value}</Text>
        ) : null}
        {showSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            disabled={disabled}
            trackColor={{ false: colors.surfaceSecondary, true: colors.accent }}
            thumbColor={colors.textPrimary}
          />
        ) : null}
        {showChevron ? (
          <Ionicons name="chevron-forward" size={CHEVRON_SIZE} color={colors.textSecondary} />
        ) : null}
      </View>
    </>
  );

  if (onPress && !disabled) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.row, pressed && { opacity: PRESSED_OPACITY }]}
        accessibilityRole="button"
        accessibilityLabel={title}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[styles.row, disabled && styles.rowDisabled]}>{content}</View>;
}

export default memo(SettingsItemComponent);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
  },
  rowDisabled: {
    opacity: 0.55,
  },
  iconBadge: {
    width: ICON_BADGE_SIZE,
    height: ICON_BADGE_SIZE,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  value: {
    fontSize: 14,
  },
});
