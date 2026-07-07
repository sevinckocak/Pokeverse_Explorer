import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '@/store';
import HomeScreen from '@/screens/HomeScreen';

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
      <StatusBar style="auto" />
    </Provider>
  );
}
