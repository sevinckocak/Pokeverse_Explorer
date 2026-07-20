import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { store } from '@/store';
import { useNavigationTheme } from '@/hooks/useNavigationTheme';
import AppBootstrap from '@/providers/AppBootstrap';

interface AppProvidersProps {
  children: ReactNode;
}

interface ThemedNavigationContainerProps {
  children: ReactNode;
}

// Split out from AppProviders because it needs `useNavigationTheme()`
// (Redux-backed), which requires being rendered *inside* <Provider> —
// AppProviders itself sits above the Provider it creates, so it has no
// store access (same reasoning as AppBootstrap).
function ThemedNavigationContainer({ children }: ThemedNavigationContainerProps) {
  const navigationTheme = useNavigationTheme();

  return <NavigationContainer theme={navigationTheme}>{children}</NavigationContainer>;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <ThemedNavigationContainer>
        <AppBootstrap />
        {children}
        <StatusBar style="auto" />
      </ThemedNavigationContainer>
    </Provider>
  );
}
