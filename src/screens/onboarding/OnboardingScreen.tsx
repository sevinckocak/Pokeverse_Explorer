import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation';
import { ONBOARDING_COLORS, ONBOARDING_SLIDES } from '@/constants/onboarding';
import { SPACING } from '@/constants/theme';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';
import OnboardingSlide from '@/components/onboarding/OnboardingSlide';
import Pagination from '@/components/onboarding/Pagination';
import PrimaryButton from '@/components/onboarding/PrimaryButton';
import type { OnboardingSlideData } from '@/types';

type OnboardingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

const LAST_SLIDE_INDEX = ONBOARDING_SLIDES.length - 1;

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<OnboardingNavigationProp>();
  const { completeOnboarding } = useOnboardingStatus();

  const listRef = useRef<Animated.FlatList<OnboardingSlideData>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
      setActiveIndex(nextIndex);
    },
    [width]
  );

  const goToIndex = useCallback((index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true });
  }, []);

  const finishOnboarding = useCallback(() => {
    completeOnboarding()
      .catch(() => undefined)
      .finally(() => {
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
      });
  }, [completeOnboarding, navigation]);

  const handleNext = useCallback(() => {
    if (activeIndex === LAST_SLIDE_INDEX) {
      finishOnboarding();
      return;
    }

    goToIndex(activeIndex + 1);
  }, [activeIndex, finishOnboarding, goToIndex]);

  const handleSkip = useCallback(() => {
    goToIndex(LAST_SLIDE_INDEX);
  }, [goToIndex]);

  const isLastSlide = activeIndex === LAST_SLIDE_INDEX;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.skipRow}>
        {!isLastSlide ? <PrimaryButton label="Skip" variant="ghost" onPress={handleSkip} /> : null}
      </View>

      <Animated.FlatList
        ref={listRef}
        data={ONBOARDING_SLIDES as OnboardingSlideData[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <OnboardingSlide slide={item} index={index} scrollX={scrollX} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />

      <View style={styles.footer}>
        <Pagination count={ONBOARDING_SLIDES.length} activeIndex={activeIndex} />
        <View style={styles.footerButton}>
          <PrimaryButton label={isLastSlide ? 'Get Started' : 'Next'} onPress={handleNext} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ONBOARDING_COLORS.background,
  },
  skipRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.lg,
    minHeight: 44,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
    gap: SPACING.lg,
  },
  footerButton: {
    width: '100%',
    alignItems: 'center',
  },
});
