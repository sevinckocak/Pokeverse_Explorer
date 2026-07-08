import { memo, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { ANIMATION, RADIUS, SPACING } from '@/constants/theme';

interface ProgressStatProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

function ProgressStatComponent({ label, value, maxValue, color }: ProgressStatProps) {
  const { colors } = useThemeTokens();
  const percentage = Math.min(100, Math.round((value / maxValue) * 100));
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(percentage, { duration: ANIMATION.progressDuration });
  }, [percentage, width]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
        <Text style={[styles.value, { color: colors.textPrimary }]}>{percentage}%</Text>
      </View>
      <View style={[styles.track, { backgroundColor: colors.trackBackground }]}>
        <Animated.View style={[styles.fill, fillStyle, { backgroundColor: color }]} />
      </View>
    </View>
  );
}

export const ProgressStat = memo(ProgressStatComponent);

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  value: {
    fontSize: 13,
    fontWeight: '700',
  },
  track: {
    height: 10,
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: RADIUS.pill,
  },
});
