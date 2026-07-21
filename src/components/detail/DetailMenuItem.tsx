import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DARK_THEME, RADIUS, SPACING } from '@/constants/theme';
import type { IoniconName } from '@/components/home/QuickActionCard';

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

// Always styled from the fixed DARK_THEME palette rather than
// useThemeTokens — the drawer keeps the same dark look regardless of the
// app's light/dark setting, per the drawer's "modern dark design" spec.
function DetailMenuItemComponent({ icon, label, selected, onPress }: DetailMenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        selected && styles.rowSelected,
        pressed && { opacity: PRESSED_OPACITY },
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      <View style={[styles.indicator, selected && styles.indicatorSelected]} />

      <View
        style={[
          styles.iconBadge,
          {
            backgroundColor: selected ? DARK_THEME.accent : DARK_THEME.surfaceSecondary,
            borderColor: selected ? DARK_THEME.accent : DARK_THEME.border,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={ICON_SIZE}
          color={selected ? '#FFFFFF' : DARK_THEME.textSecondary}
        />
      </View>

      <Text
        style={[
          styles.label,
          { color: selected ? DARK_THEME.textPrimary : DARK_THEME.textSecondary },
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
  rowSelected: {
    backgroundColor: DARK_THEME.surfaceSecondary,
  },
  indicator: {
    width: INDICATOR_WIDTH,
    alignSelf: 'stretch',
    borderRadius: RADIUS.pill,
    backgroundColor: 'transparent',
  },
  indicatorSelected: {
    backgroundColor: DARK_THEME.accent,
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
