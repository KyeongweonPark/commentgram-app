import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { stackStyles } from "./config";
import styles from "../styles";
import Webpage from "../screens/Webpage";
import { YellowBox } from "react-native";
import Postpage from "../screens/Postpage";
import Userpage from "../screens/Userpage";

YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);

const stackFactory = createStackNavigator();

export default ({ route, navigation }) => {
  const { InitialRoute } = route.params;

  return (
    <stackFactory.Navigator screenOptions={{ headerBackTitle: " " }}>
      <stackFactory.Screen
        name={route.name}
        component={InitialRoute}
        // options={{ headerShown: false }}
      />
      <stackFactory.Screen
        name="Webpage"
        component={Webpage}
        options={{ headerTintColor: styles.blackColor, title: "뉴스보기" }}
      />
      <stackFactory.Screen
        name="Postpage"
        component={Postpage}
        options={{ headerTintColor: styles.blackColor, title: "댓글보기" }}
      />
      <stackFactory.Screen
        name="Userpage"
        component={Userpage}
        options={{ headerTintColor: styles.blackColor, title: "프로필 보기" }}
      />
    </stackFactory.Navigator>
  );
};
