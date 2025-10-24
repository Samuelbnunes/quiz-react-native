import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { Mogra_400Regular } from '@expo-google-fonts/mogra';
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import StartScreen from '../screens/StartScreen';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultScreen from '../screens/ResultScreen';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [fontsLoaded] = useFonts({
    'Mogra-Regular': Mogra_400Regular,
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Bold': Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
