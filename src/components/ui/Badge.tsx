import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RADIUS, SPACING } from '@/constants/theme';

interface BadgeProps {
  label: string;
  backgroundColor: string;
  textColor: string;
}

function BadgeComponent({ label, backgroundColor, textColor }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </View>
  );
}

export const Badge = memo(BadgeComponent);

const styles = StyleSheet.create({
  badge: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.pill,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
