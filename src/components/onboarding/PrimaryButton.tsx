import { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { ONBOARDING_COLORS } from '@/constants/onboarding';
import { RADIUS, SPACING } from '@/constants/theme';

type PrimaryButtonVariant = 'solid' | 'ghost';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  variant?: PrimaryButtonVariant;
}

const PRESS_SCALE = 0.96;
const PRESS_DURATION = 120;

function PrimaryButtonComponent({ label, onPress, variant = 'solid' }: PrimaryButtonProps) {
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

  if (variant === 'ghost') {
    return (
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.ghostButton}
        >
          <Text style={styles.ghostLabel}>{label}</Text>
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={animatedStyle}>
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <LinearGradient
          colors={[ONBOARDING_COLORS.primary, ONBOARDING_COLORS.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.solidButton}
        >
          <Text style={styles.solidLabel}>{label}</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

export default memo(PrimaryButtonComponent);

const styles = StyleSheet.create({
  solidButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 160,
  },
  solidLabel: {
    color: ONBOARDING_COLORS.text,
    fontSize: 17,
    fontWeight: '700',
  },
  ghostButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostLabel: {
    color: ONBOARDING_COLORS.textMuted,
    fontSize: 15,
    fontWeight: '600',
  },
});
