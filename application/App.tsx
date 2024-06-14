import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';

const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#FFF' } };

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}
