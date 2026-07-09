import { memo, useEffect } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { ONBOARDING_COLORS } from '@/constants/onboarding';
import { RADIUS, SPACING } from '@/constants/theme';
import type { OnboardingIllustrationType } from '@/types';

interface OnboardingIllustrationProps {
  type: OnboardingIllustrationType;
}

const SIZE_RATIO = 0.68;
const FLOAT_DISTANCE = 10;
const FLOAT_DURATION = 2200;

const PARTICLES = [
  { top: '10%', left: '14%', size: 8, opacity: 0.5 },
  { top: '18%', left: '78%', size: 6, opacity: 0.4 },
  { top: '68%', left: '82%', size: 10, opacity: 0.35 },
  { top: '78%', left: '12%', size: 7, opacity: 0.45 },
  { top: '46%', left: '4%', size: 5, opacity: 0.3 },
] as const;

function useFloatingStyle() {
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withRepeat(
      withSequence(
        withTiming(-FLOAT_DISTANCE, { duration: FLOAT_DURATION, easing: Easing.inOut(Easing.sin) }),
        withTiming(FLOAT_DISTANCE, { duration: FLOAT_DURATION, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
  }, [offset]);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));
}

function UniverseIllustration({ size }: { size: number }) {
  const floatingStyle = useFloatingStyle();

  return (
    <View style={[styles.square, { width: size, height: size }]}>
      {PARTICLES.map((particle, index) => (
        <View
          key={index}
          style={[
            styles.particle,
            {
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
              borderRadius: particle.size / 2,
              opacity: particle.opacity,
            },
          ]}
        />
      ))}
      <Animated.View style={floatingStyle}>
        <LinearGradient
          colors={[ONBOARDING_COLORS.primary, ONBOARDING_COLORS.secondary]}
          style={[styles.pokeball, { width: size * 0.62, height: size * 0.62, borderRadius: (size * 0.62) / 2 }]}
        >
          <View style={[styles.pokeballBand, { top: size * 0.62 * 0.46 }]} />
          <View
            style={[
              styles.pokeballCenter,
              {
                width: size * 0.16,
                height: size * 0.16,
                borderRadius: (size * 0.16) / 2,
                top: size * 0.62 * 0.5 - (size * 0.16) / 2,
                left: size * 0.62 * 0.5 - (size * 0.16) / 2,
              },
            ]}
          />
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

function EverythingIllustration({ size }: { size: number }) {
  const floatingStyle = useFloatingStyle();

  return (
    <View style={[styles.square, { width: size, height: size }]}>
      <Animated.View style={[styles.phone, { width: size * 0.42, height: size * 0.78 }, floatingStyle]}>
        <LinearGradient
          colors={[ONBOARDING_COLORS.primary, ONBOARDING_COLORS.secondary]}
          style={styles.phoneScreen}
        >
          <View style={styles.phoneLineShort} />
          <View style={styles.phoneLineLong} />
          <View style={styles.phoneImagePlaceholder} />
        </LinearGradient>
      </Animated.View>

      <View style={[styles.glassCard, { top: '6%', left: '2%' }]}>
        <Text style={styles.glassCardLabel}>Stat</Text>
      </View>
      <View style={[styles.glassCard, { top: '10%', right: '0%' }]}>
        <Text style={styles.glassCardLabel}>Evolution</Text>
      </View>
      <View style={[styles.glassCard, { bottom: '14%', left: '0%' }]}>
        <Text style={styles.glassCardLabel}>Ability</Text>
      </View>
      <View style={[styles.glassCard, { bottom: '8%', right: '2%' }]}>
        <Text style={styles.glassCardLabel}>Type</Text>
      </View>
    </View>
  );
}

function ReadyIllustration({ size }: { size: number }) {
  const floatingStyle = useFloatingStyle();
  const glowSize = size * 0.9;
  const cardWidth = size * 0.62;
  const cardHeight = cardWidth * 1.3;

  return (
    <View style={[styles.square, { width: size, height: size }]}>
      <View
        style={[
          styles.glow,
          {
            width: glowSize,
            height: glowSize,
            borderRadius: glowSize / 2,
            top: (size - glowSize) / 2,
            left: (size - glowSize) / 2,
          },
        ]}
      />
      <Animated.View style={floatingStyle}>
        <LinearGradient
          colors={[ONBOARDING_COLORS.secondary, ONBOARDING_COLORS.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.pokedexCard, { width: cardWidth, height: cardHeight }]}
        >
          <View style={styles.pokedexBadge} />
          <View style={styles.pokedexLineLong} />
          <View style={styles.pokedexLineShort} />
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

function OnboardingIllustrationComponent({ type }: OnboardingIllustrationProps) {
  const { width } = useWindowDimensions();
  const size = width * SIZE_RATIO;

  if (type === 'universe') {
    return <UniverseIllustration size={size} />;
  }

  if (type === 'everything') {
    return <EverythingIllustration size={size} />;
  }

  return <ReadyIllustration size={size} />;
}

export default memo(OnboardingIllustrationComponent);

const styles = StyleSheet.create({
  square: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle: {
    position: 'absolute',
    backgroundColor: ONBOARDING_COLORS.accent,
  },
  pokeball: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pokeballBand: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: ONBOARDING_COLORS.background,
  },
  pokeballCenter: {
    position: 'absolute',
    backgroundColor: ONBOARDING_COLORS.background,
    borderWidth: 3,
    borderColor: ONBOARDING_COLORS.text,
  },
  phone: {
    borderRadius: RADIUS.lg,
    borderWidth: 4,
    borderColor: ONBOARDING_COLORS.glassBorder,
    backgroundColor: ONBOARDING_COLORS.glass,
    padding: SPACING.sm,
    overflow: 'hidden',
  },
  phoneScreen: {
    flex: 1,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    justifyContent: 'flex-end',
    gap: SPACING.xs,
  },
  phoneLineShort: {
    width: '40%',
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
  phoneLineLong: {
    width: '70%',
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  phoneImagePlaceholder: {
    marginTop: SPACING.sm,
    height: 40,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  glassCard: {
    position: 'absolute',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
    backgroundColor: ONBOARDING_COLORS.glass,
    borderWidth: 1,
    borderColor: ONBOARDING_COLORS.glassBorder,
  },
  glassCardLabel: {
    color: ONBOARDING_COLORS.text,
    fontSize: 12,
    fontWeight: '600',
  },
  glow: {
    position: 'absolute',
    backgroundColor: 'rgba(139, 92, 246, 0.35)',
  },
  pokedexCard: {
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    justifyContent: 'flex-end',
    gap: SPACING.sm,
  },
  pokedexBadge: {
    position: 'absolute',
    top: SPACING.lg,
    left: SPACING.lg,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  pokedexLineLong: {
    width: '80%',
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
  pokedexLineShort: {
    width: '50%',
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
});
