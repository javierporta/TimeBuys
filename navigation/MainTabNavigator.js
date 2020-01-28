import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import CalculatorScreen from "../screens/CalculatorScreen";
import ProfileScreen from "../screens/ProfileScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const CalculatorStack = createStackNavigator(
  {
    Calculator: CalculatorScreen
  },
  config
);

CalculatorStack.navigationOptions = {
  tabBarLabel: "Calculator",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

CalculatorStack.path = "";

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

ProfileStack.path = "";

const tabNavigator = createBottomTabNavigator({
  CalculatorStack,
  ProfileStack
});

tabNavigator.path = "";

export default tabNavigator;
