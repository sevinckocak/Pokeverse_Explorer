import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import type { ThemeColors } from '@/constants/theme';

// Single source of Stack.Navigator defaults — header background, title
// color, back button color, and screen background all come from the same
// `colors` the rest of the app already uses. Pass this to a Navigator's
// `screenOptions`, not to individual `Stack.Screen`s, so every screen
// (present and future) inherits it automatically; a screen only needs its
// own `options` for things that genuinely differ per screen (e.g. `title`).
export function createStackScreenOptions(colors: ThemeColors): NativeStackNavigationOptions {
  return {
    headerStyle: {
      backgroundColor: colors.background,
    },
    headerShadowVisible: false,
    headerTintColor: colors.textPrimary,
    headerTitleStyle: {
      color: colors.textPrimary,
    },
    contentStyle: {
      backgroundColor: colors.background,
    },
  };
}
