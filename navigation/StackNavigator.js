import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Button,Text} from "react-native"
import Home from "../screens/Home";
import Signup from "../screens/Signup";
import Signin from "../screens/Signin"
import Profile from "../screens/Profile"
import UserProfile from "../screens/UserProfile"
import SinglePost from "../screens/SinglePost"
import Search from "../screens/Search"
import Push from "../screens/Push";

import { AntDesign } from '@expo/vector-icons'
import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';


const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerTintColor: "black",
  headerBackTitle: "Back",
  headerTitleStyle:{
    fontSize:17,
    marginLeft:50
  }
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home}    options={({ navigation, route }) => ({
          headerTitle: props => 
         <Ionicons name="ios-menu" size={40} color="#00b9fb"  onPress={() => navigation.openDrawer()} /> ,
         headerRight:()=> (  <MaterialCommunityIcons name="twitter-circle" size={35} color="#00b9fb" style={{marginRight:175,marginTop:4}} />  )
        })} />
          <Stack.Screen name="SinglePost" component={SinglePost}    options={({ navigation, route }) => ({
          headerTitle: "Tweet"  
        })} />
           <Stack.Screen name="UserProfile" component={UserProfile}    options={({ navigation, route }) => ({
          title:  route.params.title,
          headerLeft:()=> (  <MaterialCommunityIcons name="twitter-circle" size={35} color="#00b9fb" style={{marginLeft:4,}} />  )
        })} />
    </Stack.Navigator>
  );
}


const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={Profile}   options={({ navigation, route }) => ({
          headerTitle: props =>  <Ionicons name="ios-menu" size={40} color="#00b9fb"  onPress={() => navigation.openDrawer()} />,
        })} />
    </Stack.Navigator>
  );
}

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Search" component={Search}   options={({ navigation, route }) => ({
          headerTitle: "Search User",
          headerLeft:()=> (  <MaterialCommunityIcons name="twitter-circle" size={35} color="#00b9fb" style={{marginLeft:4,}} />  )
        })} />
    </Stack.Navigator>
  );
}

const PushStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Push" component={Push}   options={({ navigation, route }) => ({
          headerTitle: props =>  <Ionicons name="ios-menu" size={40} color="white"  onPress={() => navigation.openDrawer()} />,
        })} />
    </Stack.Navigator>
  );
}

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
         <Stack.Screen name="Signin" component={Signin} options={{
           title:null,
           headerRight:()=> (  <MaterialCommunityIcons name="twitter-circle" size={35} color="#00b9fb" style={{marginRight:165,marginTop:4}} />  )
         }} />
      <Stack.Screen name="Signup" component={Signup} options={{
           title:null,
           headerRight:()=> (  <MaterialCommunityIcons name="twitter-circle" size={35} color="#00b9fb" style={{marginRight:165,marginTop:4}} />  )
         }} />
   
    </Stack.Navigator>
  );
}

export { MainStackNavigator,AuthStackNavigator,ProfileStackNavigator,SearchStackNavigator,PushStackNavigator };