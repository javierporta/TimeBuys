import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export function CustomButton(props) {
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: props.color ? props.color : Colors.secondary,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 25,
      paddingRight: 25
    },
    text: {
      color: Colors.white,
      fontSize: 16,
      fontWeight: "500",
      textTransform: "uppercase"
    }
  });

  return (
    <TouchableOpacity {...props} style={styles.button}>
      <Text style={styles.text}>{props.title || "Action name forgotten"}</Text>
    </TouchableOpacity>
  );
}
