import { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from '@/navigation/BottomTabNavigator';
import PokemonDetailScreen from '@/screens/PokemonDetailScreen';
import AllPokemonScreen from '@/screens/AllPokemonScreen';
import OnboardingScreen from '@/screens/onboarding/OnboardingScreen';
import AboutScreen from '@/screens/settings/AboutScreen';
import PrivacyPolicyScreen from '@/screens/settings/PrivacyPolicyScreen';
import TermsOfServiceScreen from '@/screens/settings/TermsOfServiceScreen';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { createStackScreenOptions } from '@/navigation/screenOptions';
import { ONBOARDING_COLORS } from '@/constants/onboarding';
import type { RootStackParamList } from '@/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { t } = useTranslation();
  const { isChecking, hasCompletedOnboarding } = useOnboardingStatus();
  const { colors } = useThemeTokens();

  // Passed to the Navigator, not to individual screens, so PokemonDetail,
  // AllPokemon, and any Stack.Screen added later all inherit themed header
  // colors automatically — no screen needs to redeclare them.
  const screenOptions = useMemo(() => createStackScreenOptions(colors), [colors]);

  if (isChecking) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={ONBOARDING_COLORS.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={hasCompletedOnboarding ? 'MainTabs' : 'Onboarding'}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} />
      <Stack.Screen
        name="AllPokemon"
        component={AllPokemonScreen}
        options={{ title: t('pokemonDetail.allPokemonTitle') }}
      />
      <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfServiceScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ONBOARDING_COLORS.background,
  },
});
