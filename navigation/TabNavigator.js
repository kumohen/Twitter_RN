import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SimpleLineIcons,Octicons,MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import { MainStackNavigator,SearchStackNavigator ,PushStackNavigator} from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          return <SimpleLineIcons name="home" size={24} color="black" />
        } else if (route.name === 'Search') {
          return <Octicons name="search" size={24} color="black" />
        }
        else if (route.name === 'Notification') {
          return <Ionicons name="ios-notifications-outline" size={24} color="black" />
        }

        else if (route.name === 'Info') {
          return <MaterialCommunityIcons name="email-outline" size={24} color="black" />
        }


        // You can return any component that you like here!
      
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
    >
      <Tab.Screen name="Home" component={MainStackNavigator}  />
      <Tab.Screen name="Search" component={SearchStackNavigator}  />
      <Tab.Screen name="Notification" component={PushStackNavigator}  />
      <Tab.Screen name="Info" component={MainStackNavigator}  />
     
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;