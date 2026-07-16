import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { store } from '@/store';
import AppBootstrap from '@/providers/AppBootstrap';

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppBootstrap />
        {children}
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
