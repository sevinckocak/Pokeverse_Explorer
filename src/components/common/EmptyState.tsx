import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { SPACING } from '@/constants/theme';
import type { IoniconName } from '@/types/ionicon';

interface EmptyStateProps {
  icon: IoniconName;
  title: string;
  subtitle: string;
}

const ICON_SIZE = 48;

function EmptyStateComponent({ icon, title, subtitle }: EmptyStateProps) {
  const { colors } = useThemeTokens();

  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={ICON_SIZE} color={colors.textSecondary} />
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
    </View>
  );
}

export default memo(EmptyStateComponent);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  title: {
    marginTop: SPACING.md,
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: SPACING.xs,
    fontSize: 13,
  },
});
