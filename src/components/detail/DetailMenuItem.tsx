import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { RADIUS, SPACING } from '@/constants/theme';
import type { IoniconName } from '@/types/ionicon';

interface DetailMenuItemProps {
  icon: IoniconName;
  label: string;
  selected: boolean;
  onPress: () => void;
}

const ICON_BADGE_SIZE = 36;
const ICON_SIZE = 18;
const INDICATOR_WIDTH = 3;
const PRESSED_OPACITY = 0.7;
const SELECTED_ICON_COLOR = '#FFFFFF';

// Styled from useThemeTokens() so the drawer follows the app's active
// Light/Dark setting, same as every other screen.
function DetailMenuItemComponent({ icon, label, selected, onPress }: DetailMenuItemProps) {
  const { colors } = useThemeTokens();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        selected && { backgroundColor: colors.surfaceSecondary },
        pressed && { opacity: PRESSED_OPACITY },
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      <View
        style={[styles.indicator, { backgroundColor: selected ? colors.accent : 'transparent' }]}
      />

      <View
        style={[
          styles.iconBadge,
          {
            backgroundColor: selected ? colors.accent : colors.surfaceSecondary,
            borderColor: selected ? colors.accent : colors.border,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={ICON_SIZE}
          color={selected ? SELECTED_ICON_COLOR : colors.textSecondary}
        />
      </View>

      <Text
        style={[
          styles.label,
          { color: selected ? colors.textPrimary : colors.textSecondary },
          selected && styles.labelSelected,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default memo(DetailMenuItemComponent);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
    paddingRight: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.xs,
  },
  indicator: {
    width: INDICATOR_WIDTH,
    alignSelf: 'stretch',
    borderRadius: RADIUS.pill,
  },
  iconBadge: {
    width: ICON_BADGE_SIZE,
    height: ICON_BADGE_SIZE,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  labelSelected: {
    fontWeight: '700',
  },
});
