import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
// import PhotoStackNavigation from "./PhotoStackNavigation";
import { stackStyles } from "./config";

const MainNavigation = createStackNavigator();
// <TabNavigation /> <PhotoNavigation />
export default () => {
  return (
    <NavigationContainer>
      <MainNavigation.Navigator mode="modal" headerMode="none" screenOptions={{headerStyle:{...stackStyles}}}>
        <MainNavigation.Screen name="Tab" component={TabNavigation} />
        {/* <MainNavigation.Screen name="Photo" component={PhotoStackNavigation}  /> */}
        
      </MainNavigation.Navigator>
    </NavigationContainer>
  );
};
