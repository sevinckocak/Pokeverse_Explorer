import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from '@/navigation/BottomTabNavigator';
import PokemonDetailScreen from '@/screens/PokemonDetailScreen';
import AllPokemonScreen from '@/screens/AllPokemonScreen';
import OnboardingScreen from '@/screens/onboarding/OnboardingScreen';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';
import { ONBOARDING_COLORS } from '@/constants/onboarding';
import { HOME_HEADER_COLORS } from '@/components/home/HomeHeader';
import type { RootStackParamList } from '@/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { isChecking, hasCompletedOnboarding } = useOnboardingStatus();

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
          title: 'All Pokémon',
          headerStyle: { backgroundColor: HOME_HEADER_COLORS.background },
          headerTintColor: HOME_HEADER_COLORS.title,
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
