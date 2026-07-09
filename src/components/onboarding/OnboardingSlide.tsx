import { memo } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { ONBOARDING_COLORS } from '@/constants/onboarding';
import { SPACING } from '@/constants/theme';
import OnboardingIllustration from '@/components/onboarding/OnboardingIllustration';
import type { OnboardingSlideData } from '@/types';

interface OnboardingSlideProps {
  slide: OnboardingSlideData;
  index: number;
  scrollX: SharedValue<number>;
}

const PARALLAX_OFFSET_RATIO = 0.3;
const INACTIVE_SCALE = 0.85;

function OnboardingSlideComponent({ slide, index, scrollX }: OnboardingSlideProps) {
  const { width } = useWindowDimensions();
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const illustrationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(scrollX.value, inputRange, [
          width * PARALLAX_OFFSET_RATIO,
          0,
          -width * PARALLAX_OFFSET_RATIO,
        ]),
      },
    ],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollX.value, inputRange, [0, 1, 0]),
    transform: [
      { scale: interpolate(scrollX.value, inputRange, [INACTIVE_SCALE, 1, INACTIVE_SCALE]) },
    ],
  }));

  return (
    <View style={[styles.container, { width }]}>
      <Animated.View style={illustrationStyle}>
        <OnboardingIllustration type={slide.illustration} />
      </Animated.View>
      <Animated.View style={[styles.content, contentStyle]}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </Animated.View>
    </View>
  );
}

export default memo(OnboardingSlideComponent);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  content: {
    marginTop: SPACING.xxl,
    alignItems: 'center',
  },
  title: {
    color: ONBOARDING_COLORS.text,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  description: {
    marginTop: SPACING.md,
    color: ONBOARDING_COLORS.textMuted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
