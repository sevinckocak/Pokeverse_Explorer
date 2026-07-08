import { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { GlassCard } from '@/components/ui/GlassCard';
import { SPACING } from '@/constants/theme';

interface SectionStateProps {
  title: string;
  message: string;
}

function SectionStateComponent({ title, message }: SectionStateProps) {
  const { colors } = useThemeTokens();

  return (
    <GlassCard title={title}>
      <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
    </GlassCard>
  );
}

export const SectionState = memo(SectionStateComponent);

const styles = StyleSheet.create({
  message: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: SPACING.sm,
  },
});
