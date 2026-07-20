import { memo } from 'react';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { RADIUS, SPACING } from '@/constants/theme';

export type IoniconName = ComponentProps<typeof Ionicons>['name'];

interface QuickActionCardProps {
  icon: IoniconName;
  label: string;
  onPress?: () => void;
}

const BUTTON_HEIGHT = 52;
const ICON_SIZE = 18;
const PRESS_SCALE = 0.96;
const PRESS_DURATION = 120;

function QuickActionCardComponent({ icon, label, onPress }: QuickActionCardProps) {
  const { colors } = useThemeTokens();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(PRESS_SCALE, { duration: PRESS_DURATION });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: PRESS_DURATION });
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        style={[styles.pill, { backgroundColor: colors.surface, borderColor: colors.border }]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <Ionicons name={icon} size={ICON_SIZE} color={colors.accent} />
        <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

export default memo(QuickActionCardComponent);

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
