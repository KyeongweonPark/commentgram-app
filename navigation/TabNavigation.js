import "react-native-gesture-handler";
import React from "react";
import { View, Platform, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Tabs/Home";
import NaverNews from "../screens/Tabs/NaverNews";
import DaumNews from "../screens/Tabs/DaumNews";
import Ranked from "../screens/Tabs/Ranked";
import Profile from "../screens/Tabs/Profile";
import NavIcon from "../components/NavIcon";
import NavIcon2 from "../components/NavIcon2";
import { stackStyles } from "./config";
import stackFactory from "./stackFactory";
import NavIcon3 from "../components/NavIcon3";


const TabNavigation = createBottomTabNavigator();

export default () => {
  return (
    <TabNavigation.Navigator
      tabBarOptions={{ showLabel: false, Style: { ...stackStyles } }}
    >
      <TabNavigation.Screen
        name="Home"
        component={stackFactory}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-home" : "md-home"}
            />
          ),
        }}
        initialParams={{
          name: "Home",
          InitialRoute: Home,
        }}
      />
      <TabNavigation.Screen
        name="NaverNews"
        component={stackFactory}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon3
              focused={focused}
              name={"naver"}
              size={30}
            />
          ),
        }}
        initialParams={{
          name: "NaverNews",
          InitialRoute: NaverNews,
          title: "",
        }}
      />
      <TabNavigation.Screen
        name="DaumNews"
        component={stackFactory}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon3
              focused={focused}
              name={"daum"}
              size={26}
            />
          ),
        }}
        initialParams={{
          name: "DaumNews",
          InitialRoute: DaumNews,
          title: "",
        }}
      />
      <TabNavigation.Screen
        name="Ranked"
        component={stackFactory}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={
                Platform.OS === "ios" ? "ios-star-outline" : "md-star-outline"
              }
            />
          ),
        }}
        initialParams={{
          name: "Ranked",
          InitialRoute: Ranked,
        }}
      />
      <TabNavigation.Screen
        name="Profile"
        component={stackFactory}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-person" : "md-person"}
            />
          ),
        }}
        initialParams={{
          name: "Profile",
          InitialRoute: Profile,
        }}
      />
    </TabNavigation.Navigator>
    // <View>
    //     <Text>TabNav</Text>
    // </View>
  );
};
