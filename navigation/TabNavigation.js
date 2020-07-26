import "react-native-gesture-handler";
import React from "react";
import { View, Platform, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Tabs/Home";
import NaverNews from "../screens/Tabs/NaverNews";
import Ranked from "../screens/Tabs/Ranked";
import Profile from "../screens/Tabs/Profile";
import NavIcon from "../components/NavIcon";
import NavIcon2 from "../components/NavIcon2";
import { stackStyles } from "./config";
import News from "../screens/Tabs/News";
import stackFactory from "./stackFactory";

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
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-search" : "md-search"}
            />
          ),
        }}
        initialParams={{
          name: "NaverNews",
          InitialRoute: NaverNews,
        }}
      />
      <TabNavigation.Screen
        name="News"
        component={stackFactory}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon2
              focused={focused}
              name={Platform.OS === "ios" ? "news" : "news"}
            />
          ),
        }}
        initialParams={{
          name: "News",
          InitialRoute: News,
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
        component={Profile}
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
