import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ONBOARDING_STORAGE_KEY } from '@/constants/onboarding';

export interface OnboardingStatus {
  isChecking: boolean;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => Promise<void>;
}

export function useOnboardingStatus(): OnboardingStatus {
  const [isChecking, setIsChecking] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem(ONBOARDING_STORAGE_KEY)
      .then((value) => {
        if (isMounted) {
          setHasCompletedOnboarding(value === 'true');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsChecking(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    setHasCompletedOnboarding(true);
  }, []);

  return { isChecking, hasCompletedOnboarding, completeOnboarding };
}
