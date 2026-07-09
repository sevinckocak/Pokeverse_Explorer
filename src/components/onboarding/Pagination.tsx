import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ONBOARDING_COLORS } from '@/constants/onboarding';
import { SPACING } from '@/constants/theme';

interface PaginationProps {
  count: number;
  activeIndex: number;
}

interface PaginationDotProps {
  isActive: boolean;
}

const DOT_SIZE = 8;
const DOT_ACTIVE_WIDTH = 24;
const DOT_ANIMATION_DURATION = 250;

function PaginationDot({ isActive }: PaginationDotProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(isActive ? DOT_ACTIVE_WIDTH : DOT_SIZE, {
      duration: DOT_ANIMATION_DURATION,
    }),
    opacity: withTiming(isActive ? 1 : 0.4, { duration: DOT_ANIMATION_DURATION }),
  }));

  return (
    <Animated.View
      style={[
        styles.dot,
        { backgroundColor: isActive ? ONBOARDING_COLORS.accent : ONBOARDING_COLORS.text },
        animatedStyle,
      ]}
    />
  );
}

function PaginationComponent({ count, activeIndex }: PaginationProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }, (_, index) => (
        <PaginationDot key={index} isActive={index === activeIndex} />
      ))}
    </View>
  );
}

export default memo(PaginationComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  dot: {
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});
