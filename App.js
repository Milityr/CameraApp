import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from "./components/Main"
import Users from "./components/Gallery"
import Camera from "./components/CameraScreen"
import Big from "./components/BigPhoto"
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="s1"
          component={Main}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="s2"
          component={Users}
          options={{
            title: 'Gallery',
            headerStyle: {
              backgroundColor: '#4a148c',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        {<Stack.Screen
          name="s3"
          component={Camera}
          options={{
            headerShown: false,
          }} />}
        {<Stack.Screen
          name="s4"
          component={Big}
          ptions={{
            title: 'BigPhoto',
            headerStyle: {
              backgroundColor: '#4a148c',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;