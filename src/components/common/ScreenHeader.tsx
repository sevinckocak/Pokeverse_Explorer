import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { HOME_HEADER_COLORS, RADIUS, SPACING } from '@/constants/theme';
import type { IoniconName } from '@/components/home/QuickActionCard';

interface ScreenHeaderProps {
  title: string;
  subtitle: string;
  icon: IoniconName;
  onIconPress?: () => void;
  showBadge?: boolean;
  info?: string;
}

const ICON_BUTTON_SIZE = 48;
const ICON_SIZE = 22;
const BADGE_SIZE = 10;

// Shared top-of-screen header for Home, Favorites, and any future screen
// that needs the same "title + subtitle + icon badge" shell. The icon
// button always renders as a TouchableOpacity (even with no onIconPress)
// so screens that don't need it interactive still get identical visuals —
// this matches how HomeHeader's notification button always behaved before
// this component existed.
function ScreenHeaderComponent({
  title,
  subtitle,
  icon,
  onIconPress,
  showBadge = false,
  info,
}: ScreenHeaderProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {info ? <Text style={styles.info}>{info}</Text> : null}
        </View>

        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={onIconPress}
          accessibilityRole="button"
          accessibilityLabel={title}
        >
          <Ionicons name={icon} size={ICON_SIZE} color={HOME_HEADER_COLORS.title} />
          {showBadge ? <View style={styles.badge} /> : null}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default memo(ScreenHeaderComponent);

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: HOME_HEADER_COLORS.background,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    backgroundColor: HOME_HEADER_COLORS.background,
  },
  textBlock: {
    flex: 1,
    marginRight: SPACING.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: HOME_HEADER_COLORS.title,
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: SPACING.xs,
    fontSize: 14,
    lineHeight: 20,
    color: HOME_HEADER_COLORS.subtitle,
  },
  info: {
    marginTop: SPACING.sm,
    fontSize: 13,
    fontWeight: '600',
    color: HOME_HEADER_COLORS.accent,
  },
  iconButton: {
    width: ICON_BUTTON_SIZE,
    height: ICON_BUTTON_SIZE,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HOME_HEADER_COLORS.glass,
    borderWidth: 1,
    borderColor: HOME_HEADER_COLORS.glassBorder,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: RADIUS.pill,
    backgroundColor: HOME_HEADER_COLORS.accent,
    borderWidth: 1.5,
    borderColor: HOME_HEADER_COLORS.background,
  },
});
