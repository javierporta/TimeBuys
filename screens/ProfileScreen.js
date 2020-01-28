import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Profile from "../components/Profile";
import Colors from "../constants/Colors";

export default function ProfileScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */

  return (
    <ScrollView style={styles.container}>
      <Profile />
    </ScrollView>
  );
}

ProfileScreen.navigationOptions = {
  title: "Profile",
  headerStyle: {
    backgroundColor: Colors.background
  },
  headerTitleStyle: {
    color: "white"
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "white"
  }
});
