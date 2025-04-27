// import 'react-native-gesture-handler';
// import { View, Text } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
// import WelcomeScreen from '.';
// import DrawerNav from './drawer';
// import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Stack } from 'expo-router';

// const Stack = createStackNavigator();

// const Layout = () => {
//   return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="welcome"
    //       component = {WelcomeScreen}
    //     />
    //     <Stack.Screen
    //       name="drawer"
    //       component = {DrawerNav}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>


export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Welcome',
            title: '',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: 'Home',  
            title: 'Home',
            drawerActiveBackgroundColor: '#f7f1e3',
            headerStyle: { backgroundColor: '#FEA47F',borderRadius: 15,borderColor: 'black' },
            headerShown: true,
            headerShadowVisible: true,
          }}
        />
        <Drawer.Screen
          name="about"
          
          options={{
            drawerLabel: 'About',
            title: 'About',
            drawerActiveBackgroundColor: '#f7f1e3',
            headerShown: true,
            headerStyle: { backgroundColor: '#FEA47F',borderRadius: 15,borderColor: 'black' },
            headerShadowVisible: true,
          }}
        />
      </Drawer>


      
    </GestureHandlerRootView>
   
  );
}
