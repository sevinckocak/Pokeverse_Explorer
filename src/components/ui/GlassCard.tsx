import { memo } from 'react';
import type { PropsWithChildren } from 'react';
import { StyleSheet, Text } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { ANIMATION, CARD_SHADOW, RADIUS, SPACING } from '@/constants/theme';

interface GlassCardProps extends PropsWithChildren {
  title?: string;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}

function GlassCardComponent({ title, delay = 0, style, children }: GlassCardProps) {
  const { colors } = useThemeTokens();

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(ANIMATION.duration)}
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
        style,
      ]}
    >
      {title ? (
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      ) : null}
      {children}
    </Animated.View>
  );
}

export const GlassCard = memo(GlassCardComponent);

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...CARD_SHADOW,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: SPACING.md,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
});
