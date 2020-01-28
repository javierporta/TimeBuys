import React from "react";
import { TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export function CustomInput(props) {
  const styles = StyleSheet.create({
    textInputStyleClass: {
      // Setting up Hint Align center.
      textAlign: "center",
      // Setting up TextInput height as 50 pixel.
      height: 50,
      // Set border width.
      borderWidth: 2,
      // Set border Hex Color Code Here.
      borderColor: props.isvalidcustom ? "green" : "red",
      // Set border Radius.
      borderRadius: 15,
      //Set background color of Text Input.
      backgroundColor: "#FFFFFF",
      margin: 5
    }
  });

  return <TextInput {...props} style={styles.textInputStyleClass} />;
}
