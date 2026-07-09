import { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { GlassCard } from '@/components/ui/GlassCard';
import { SPACING } from '@/constants/theme';
import type { PokemonTypeTheme } from '@/constants/pokemonTheme';

interface SectionStateProps {
  title: string;
  message: string;
  theme: PokemonTypeTheme;
}

function SectionStateComponent({ title, message, theme }: SectionStateProps) {
  const { colors } = useThemeTokens();

  return (
    <GlassCard title={title} theme={theme}>
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
