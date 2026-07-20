import { useEffect } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { LANGUAGE_OPTIONS } from '@/localization';
import type { SupportedLanguage } from '@/localization';
import { CARD_SHADOW, RADIUS, SPACING } from '@/constants/theme';

interface LanguagePickerModalProps {
  visible: boolean;
  selectedLanguage: SupportedLanguage;
  onSelectLanguage: (language: SupportedLanguage) => void;
  onClose: () => void;
}

const CHECK_ICON_SIZE = 20;
const FLAG_FONT_SIZE = 22;
const CARD_MAX_WIDTH = 360;
const CARD_ANIMATION_DURATION = 220;
const BACKDROP_FADE_DURATION = 200;
const BLUR_INTENSITY = 40;
const CARD_INITIAL_SCALE = 0.95;
// Within the requested 0.65–0.75 range: dark enough that the Settings
// screen behind it is not clearly visible, even before the blur is added.
const BACKDROP_COLOR = 'rgba(0, 0, 0, 0.7)';

// Presentational only — the Settings screen owns `visible`/`selectedLanguage`
// and decides what selection actually does (dispatch(setLanguage(...))).
// This component never touches Redux directly, so it stays reusable for any
// future "pick one option from a list" dialog with the same look.
export default function LanguagePickerModal({
  visible,
  selectedLanguage,
  onSelectLanguage,
  onClose,
}: LanguagePickerModalProps) {
  const { t } = useTranslation();
  const { colors, isDark } = useThemeTokens();

  const scale = useSharedValue(CARD_INITIAL_SCALE);
  const opacity = useSharedValue(0);

  // Modal unmounts its content when `visible` becomes false, so this effect
  // re-fires on every fresh mount (i.e. every time the sheet opens),
  // animating 0.95 -> 1.0 scale + fade-in each time without extra state.
  useEffect(() => {
    scale.value = withTiming(1, { duration: CARD_ANIMATION_DURATION });
    opacity.value = withTiming(1, { duration: CARD_ANIMATION_DURATION });
  }, [opacity, scale]);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const handleSelect = (language: SupportedLanguage) => {
    onSelectLanguage(language);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Blur + dark tint fade in together as one backdrop layer. RN's
            Modal blocks all touches/scroll to whatever is behind it
            natively, so nothing extra is needed to stop interaction with
            the Settings screen underneath. */}
        <Animated.View entering={FadeIn.duration(BACKDROP_FADE_DURATION)} style={styles.backdrop}>
          <BlurView
            intensity={BLUR_INTENSITY}
            tint={isDark ? 'dark' : 'light'}
            style={StyleSheet.absoluteFill}
          />
          <Pressable
            style={[StyleSheet.absoluteFill, { backgroundColor: BACKDROP_COLOR }]}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={t('common.cancel')}
          />
        </Animated.View>

        {/* pointerEvents="box-none": taps on the empty padding around the
            card fall through to the backdrop Pressable above and close the
            modal; taps on the card itself are claimed by its own Pressable
            below, so selecting a row never also triggers that close. */}
        <View style={styles.centerWrapper} pointerEvents="box-none">
          <Animated.View style={[styles.cardWrapper, cardAnimatedStyle]}>
            <Pressable
              onPress={() => undefined}
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
                CARD_SHADOW,
              ]}
            >
              <Text style={[styles.title, { color: colors.textPrimary }]}>
                {t('settings.selectLanguage')}
              </Text>

              {LANGUAGE_OPTIONS.map((option) => {
                const isSelected = option.code === selectedLanguage;

                return (
                  <Pressable
                    key={option.code}
                    onPress={() => handleSelect(option.code)}
                    style={({ pressed }) => [
                      styles.row,
                      {
                        backgroundColor: isSelected ? colors.surfaceSecondary : colors.surface,
                        borderColor: colors.border,
                      },
                      pressed && styles.rowPressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={option.label}
                    accessibilityState={{ selected: isSelected }}
                  >
                    <Text style={styles.flag}>{option.flag}</Text>
                    <Text
                      style={[
                        styles.rowLabel,
                        { color: colors.textPrimary },
                        isSelected && styles.rowLabelSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {isSelected ? (
                      <Ionicons name="checkmark" size={CHECK_ICON_SIZE} color={colors.accent} />
                    ) : null}
                  </Pressable>
                );
              })}
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  cardWrapper: {
    width: '100%',
    maxWidth: CARD_MAX_WIDTH,
  },
  card: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.sm,
  },
  rowPressed: {
    opacity: 0.7,
  },
  flag: {
    fontSize: FLAG_FONT_SIZE,
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  rowLabelSelected: {
    fontWeight: '700',
  },
});
