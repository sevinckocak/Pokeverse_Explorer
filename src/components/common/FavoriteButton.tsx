import { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HOME_HEADER_COLORS } from '@/components/home/HomeHeader';
import { RADIUS } from '@/constants/theme';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  size?: number;
  variant?: 'glass' | 'solid';
}

const DEFAULT_SIZE = 44;
const MIN_TOUCH_TARGET = 44;
const ICON_SIZE_RATIO = 0.5;
const ACTIVE_OPACITY = 0.7;

// "solid" uses a dark scrim (not a flat color) so the button reads clearly
// on top of any of PokemonCard's per-type gradients, light or dark alike.
const FAVORITE_BUTTON_COLORS = {
  glassBackground: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.18)',
  solidBackground: 'rgba(0, 0, 0, 0.45)',
  solidBorder: 'rgba(255, 255, 255, 0.3)',
  iconInactive: '#FFFFFF',
  iconActive: HOME_HEADER_COLORS.accent,
} as const;

// Fully props-driven and stateless on purpose: a future Reanimated press or
// favorite-toggle animation can wrap this same JSX (e.g. swap the outer
// TouchableOpacity for an Animated.View + Pressable) without touching the
// public API or how callers use it.
function FavoriteButtonComponent({
  isFavorite,
  onPress,
  size = DEFAULT_SIZE,
  variant = 'glass',
}: FavoriteButtonProps) {
  const isGlass = variant === 'glass';
  const iconSize = size * ICON_SIZE_RATIO;
  const hitSlopValue = Math.max(0, (MIN_TOUCH_TARGET - size) / 2);
  const hitSlop = {
    top: hitSlopValue,
    bottom: hitSlopValue,
    left: hitSlopValue,
    right: hitSlopValue,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={ACTIVE_OPACITY}
      hitSlop={hitSlop}
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      style={[
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: RADIUS.pill,
          backgroundColor: isGlass
            ? FAVORITE_BUTTON_COLORS.glassBackground
            : FAVORITE_BUTTON_COLORS.solidBackground,
          borderWidth: 1,
          borderColor: isGlass
            ? FAVORITE_BUTTON_COLORS.glassBorder
            : FAVORITE_BUTTON_COLORS.solidBorder,
        },
      ]}
    >
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={iconSize}
        color={isFavorite ? FAVORITE_BUTTON_COLORS.iconActive : FAVORITE_BUTTON_COLORS.iconInactive}
      />
    </TouchableOpacity>
  );
}

export default memo(FavoriteButtonComponent);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
});
