import { Children, Fragment, isValidElement, memo } from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HOME_HEADER_COLORS } from '@/components/home/HomeHeader';
import { RADIUS, SPACING } from '@/constants/theme';

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

// Renders each SettingsItem child into a single rounded card, inserting a
// divider between rows automatically — callers just list items, they never
// need to know which one happens to be last.
function SettingsSectionComponent({ title, children }: SettingsSectionProps) {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.card}>
        {items.map((item, index) => (
          <Fragment key={item.key ?? index}>
            {item}
            {index < items.length - 1 ? <View style={styles.divider} /> : null}
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
    color: HOME_HEADER_COLORS.subtitle,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  card: {
    borderRadius: RADIUS.lg,
    backgroundColor: HOME_HEADER_COLORS.glass,
    borderWidth: 1,
    borderColor: HOME_HEADER_COLORS.glassBorder,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    marginLeft: SPACING.md,
    backgroundColor: HOME_HEADER_COLORS.glassBorder,
  },
});
