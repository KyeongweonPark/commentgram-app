import "react-native-gesture-handler";
import * as React from "react";
import { View, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Tabs/Home";
// import Search from "../screens/Tabs/Search";
// import Notifications from "../screens/Tabs/Notifications";
// import Profile from "../screens/Tabs/Profile";
// import stackFactory from "./stackFactory";
import { TouchableOpacity } from "react-native-gesture-handler";
// import MessagesLink from "../components/MessagesLink";
// import NavIcon from "../components/NavIcon";
import { stackStyles } from "./config";

const TabNavigation = createBottomTabNavigator();

export default () => {
  return (
    <TabNavigation.Navigator
      tabBarOptions={{
        showLabel: false,
        Style: { ...stackStyles},
      }}
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
          customConfig: {
            title: "Home",
            headerStyle: {
              height: 80,
            },
            headerRight: MessagesLink,
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <NavIcon focused={true} name="logo-instagram" size={36} />
              </View>
            ),
          },
        }}
      />
      
    </TabNavigation.Navigator>
  );
};
