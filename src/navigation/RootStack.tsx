import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/HomeScreen';
import PokemonDetailScreen from '@/screens/PokemonDetailScreen';
import OnboardingScreen from '@/screens/onboarding/OnboardingScreen';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';
import { ONBOARDING_COLORS } from '@/constants/onboarding';
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
    <Stack.Navigator initialRouteName={hasCompletedOnboarding ? 'Home' : 'Onboarding'}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} />
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
