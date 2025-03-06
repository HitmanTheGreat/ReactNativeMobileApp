import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { persistor, store } from '@/store/store';
import { FC } from 'react';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Type for your loading screen component
const LoadingScreen: FC = () => {
  return (
    <div>Loading...</div> // Customize this with a proper loading component
  );
};

const RootLayout: FC = () => {
  const colorScheme = useColorScheme();
  
  // Load fonts using the `useFonts` hook
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // If fonts are not loaded yet, return a loading screen
  if (!loaded) {
    return <LoadingScreen />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;
