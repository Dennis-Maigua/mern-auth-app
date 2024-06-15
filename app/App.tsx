import React, { useEffect } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';

// import SplashScreen from 'react-native-splash-screen';
// import { Platform } from 'react-native';

const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#FFF' } };

export default function App() {
  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     SplashScreen.hide();
  //   }
  // }, []);

  return (
    <NavigationContainer theme={theme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}
