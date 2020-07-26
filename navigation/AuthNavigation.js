import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../screens/Auth/Signup";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";
import { Text } from "react-native";
import { stackStyles } from "./config";

const AuthNavigation = createStackNavigator();
export default () => {
  return (
    <NavigationContainer>
      <AuthNavigation.Navigator headerMode="none">
        <AuthNavigation.Screen name="AuthHome" component={AuthHome} />
        <AuthNavigation.Screen name="Login" component={Login} />
        <AuthNavigation.Screen name="Confirm" component={Confirm} />
        <AuthNavigation.Screen name="Signup" component={Signup} />
      </AuthNavigation.Navigator>
    </NavigationContainer>
  );
};
