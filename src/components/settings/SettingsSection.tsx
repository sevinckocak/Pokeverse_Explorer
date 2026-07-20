import { Children, Fragment, isValidElement, memo } from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { RADIUS, SPACING } from '@/constants/theme';

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

// Renders each SettingsItem child into a single rounded card, inserting a
// divider between rows automatically — callers just list items, they never
// need to know which one happens to be last.
function SettingsSectionComponent({ title, children }: SettingsSectionProps) {
  const { colors } = useThemeTokens();
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textSecondary }]}>{title}</Text>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {items.map((item, index) => (
          <Fragment key={item.key ?? index}>
            {item}
            {index < items.length - 1 ? (
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
            ) : null}
          </Fragment>
        ))}
      </View>
    </View>
  );
}

export default memo(SettingsSectionComponent);

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  title: {
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  card: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    marginLeft: SPACING.md,
  },
});
