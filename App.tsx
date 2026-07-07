import AppProviders from '@/providers/AppProviders';
import { AppNavigator } from '@/navigation';

export default function App() {
  return (
    <AppProviders>
      <AppNavigator />
    </AppProviders>
  );
}
