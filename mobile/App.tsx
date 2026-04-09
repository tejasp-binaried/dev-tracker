import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/app.navigator';
import { useColorScheme } from './src/shared/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
