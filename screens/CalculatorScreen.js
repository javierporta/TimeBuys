import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Calculator from "../components/Calculator";
import Colors from "../constants/Colors";

export default function CalculatorScreen() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <Calculator />
    </ScrollView>
  );
}

CalculatorScreen.navigationOptions = {
  title: "Calculator",
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
