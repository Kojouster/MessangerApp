
import React,{}  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import Login from './screens/Login';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewChatScreen from './screens/NewChatScreen';
import MyChatScreen from './screens/MyChatScreen';
import SendImageScreen from './screens/SendImageScreen';
import CameraScreen from './screens/CameraScreen';
import PhotoScreen from './screens/PhotoScreen';
import BarCodeReaderScreen from './screens/BarCodeReaderScreen';


const Stack = createNativeStackNavigator();
const globalScreens = {
  headerStyle: {backgroundColor: "#603F83FF"},
  headerTitleStyle: {color: "#C7D3D4FF"},
  headerTintColor: "white",
}

export default function App() {
  return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName = "Login" screenOptions={globalScreens}>
      <Stack.Screen
       name = "Login" 
       component ={Login}
       />
        <Stack.Screen
        name = "Register"
        component = {RegisterScreen}
        />
         <Stack.Screen
        name = "Home"
        component = {HomeScreen}
        />
          <Stack.Screen
        name = "NewChat"
        component = {NewChatScreen}
        />

        <Stack.Screen
        name = "Chat"
        component = {MyChatScreen}
        />

        <Stack.Screen
        name = "Image"
        component = {SendImageScreen}
        />

       <Stack.Screen
        name = "Camera"
        component = {CameraScreen}
        />
         <Stack.Screen
        name = "Photo"
        component = {PhotoScreen}
      
        />
        <Stack.Screen
        name = "Barcode"
        component = {BarCodeReaderScreen}
      
        />
       </Stack.Navigator>
    </NavigationContainer>
  
  );
}
const styles = StyleSheet.create({
  app: {
  backgroundColor:"#603F83FF",
  height: 200,
 
  },
  appBody: {
 
    backgroundColor:"#C7D3D4FF",
    height: 1200,
    width:1200
  }
});



