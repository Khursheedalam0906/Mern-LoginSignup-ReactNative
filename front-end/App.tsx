import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './src/pages/Welcome';
import Homepage from './src/pages/Homepage';
import Verifications from './src/pages/Verifications';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="homepage"
          component={Homepage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="verification"
          component={Verifications}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
