import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HOME_HEADER_COLORS } from '@/components/home/HomeHeader';
import { SPACING } from '@/constants/theme';
import type { IoniconName } from '@/components/home/QuickActionCard';

interface EmptyStateProps {
  icon: IoniconName;
  title: string;
  subtitle: string;
}

const ICON_SIZE = 48;

function EmptyStateComponent({ icon, title, subtitle }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={ICON_SIZE} color={HOME_HEADER_COLORS.subtitle} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
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
    color: HOME_HEADER_COLORS.title,
  },
  subtitle: {
    marginTop: SPACING.xs,
    fontSize: 13,
    color: HOME_HEADER_COLORS.subtitle,
  },
});
