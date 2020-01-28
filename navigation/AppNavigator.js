import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import HomeTabNavigator from "./HomeTabNavigator";

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Home: HomeTabNavigator,
      Main: MainTabNavigator
    },
    {
      initialRouteName: "Home"
    }
  )
);
