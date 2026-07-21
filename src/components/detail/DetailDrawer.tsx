import { memo, useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import DetailMenuItem from '@/components/detail/DetailMenuItem';
import { DARK_THEME, RADIUS, SPACING } from '@/constants/theme';
import { DETAIL_MENU_ITEMS } from '@/constants/detailMenu';
import type { DetailSection } from '@/constants/detailMenu';

interface DetailDrawerProps {
  visible: boolean;
  selectedSection: DetailSection;
  onSelectSection: (section: DetailSection) => void;
  onClose: () => void;
}

const ANIMATION_DURATION = 260;
const DRAWER_WIDTH_RATIO = 0.78;
const MAX_DRAWER_WIDTH = 300;
const CLOSE_BUTTON_SIZE = 32;
const CLOSE_ICON_SIZE = 20;

// Custom slide-in panel (deliberately not React Navigation Drawer) so it can
// be dropped onto a single screen without touching the navigator. Stays
// mounted for the duration of the closing animation via `isMounted` instead
// of disappearing the instant `visible` flips false, so the slide-out and
// backdrop fade actually get to play before the Modal unmounts.
function DetailDrawerComponent({
  visible,
  selectedSection,
  onSelectSection,
  onClose,
}: DetailDrawerProps) {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const drawerWidth = Math.min(width * DRAWER_WIDTH_RATIO, MAX_DRAWER_WIDTH);

  const [isMounted, setIsMounted] = useState(visible);
  const translateX = useSharedValue(-drawerWidth);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
      backdropOpacity.value = withTiming(1, { duration: ANIMATION_DURATION });
      return;
    }

    translateX.value = withTiming(-drawerWidth, { duration: ANIMATION_DURATION });
    backdropOpacity.value = withTiming(0, { duration: ANIMATION_DURATION }, (finished) => {
      if (finished) {
        runOnJS(setIsMounted)(false);
      }
    });
  }, [visible, drawerWidth, translateX, backdropOpacity]);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!isMounted) {
    return null;
  }

  return (
    <Modal visible transparent animationType="none" statusBarTranslucent onRequestClose={onClose}>
      <View style={styles.root}>
        <Pressable
          style={styles.backdropTouchable}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={t('pokemonDetail.closeMenu')}
        >
          <Animated.View style={[styles.backdrop, backdropStyle]} />
        </Pressable>

        <Animated.View style={[styles.panel, { width: drawerWidth }, panelStyle]}>
          <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{t('pokemonDetail.menuTitle')}</Text>
              <Pressable
                onPress={onClose}
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel={t('pokemonDetail.closeMenu')}
              >
                <Ionicons name="close" size={CLOSE_ICON_SIZE} color={DARK_THEME.textSecondary} />
              </Pressable>
            </View>

            <View style={styles.menuList}>
              {DETAIL_MENU_ITEMS.map((item) => (
                <DetailMenuItem
                  key={item.section}
                  icon={item.icon}
                  label={t(`pokemonDetail.menu.${item.section}`)}
                  selected={item.section === selectedSection}
                  onPress={() => onSelectSection(item.section)}
                />
              ))}
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default memo(DetailDrawerComponent);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backdropTouchable: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: DARK_THEME.background,
    borderRightWidth: 1,
    borderColor: DARK_THEME.border,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: DARK_THEME.textPrimary,
  },
  closeButton: {
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DARK_THEME.surfaceSecondary,
  },
  menuList: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
  },
});
