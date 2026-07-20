import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from '@/navigation/BottomTabNavigator';
import PokemonDetailScreen from '@/screens/PokemonDetailScreen';
import AllPokemonScreen from '@/screens/AllPokemonScreen';
import OnboardingScreen from '@/screens/onboarding/OnboardingScreen';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { ONBOARDING_COLORS } from '@/constants/onboarding';
import type { RootStackParamList } from '@/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { t } = useTranslation();
  const { isChecking, hasCompletedOnboarding } = useOnboardingStatus();
  const { colors } = useThemeTokens();

  if (isChecking) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={ONBOARDING_COLORS.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={hasCompletedOnboarding ? 'MainTabs' : 'Onboarding'}>
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
        options={{
          title: t('pokemonDetail.allPokemonTitle'),
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
        }}
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
