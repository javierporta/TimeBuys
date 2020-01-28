import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { CustomInput } from "./CustomInput";
import { CustomButton } from "./CustomButton";
import Keys from "../constants/Keys";
import Toast, { DURATION } from "react-native-easy-toast";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      salary: "",
      nameIsValid: true,
      salaryIsValid: true
    };
  }

  async componentDidMount() {
    let userData = await this.getUserData();
    if (userData !== null) {
      const name = userData.name;
      const salary = userData.salaryRatePerHour;

      this.setState({ name, salary });
    }
  }

  isFormValid() {
    let nameIsValid, salaryIsValid;
    if (this.state.name !== null && this.state.name !== "") {
      nameIsValid = true;
    }
    if (this.state.salary !== null && this.state.salary > 0) {
      salaryIsValid = true;
    }

    this.setState({ nameIsValid, salaryIsValid });

    if (nameIsValid && salaryIsValid) {
      return true;
    }
    return false;
  }

  getUserData = async () => {
    try {
      const isDataFilled = await AsyncStorage.getItem(Keys.IS_DATA_FILLED);
      if (isDataFilled !== null) {
        // Our data is fetched successfully
        if (isDataFilled == "true") {
          const name = await AsyncStorage.getItem(Keys.NAME);
          const salaryRatePerHour = await AsyncStorage.getItem(
            Keys.SALARY_RATE_PER_HOUR
          );
          return {
            name,
            salaryRatePerHour
          };
        } else {
          //TODO: ask for user data, go to home or settings
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  handleOnChange(stateName, stateValue) {
    let isValid = true;
    if (stateName === "name") {
      isValid = stateValue !== null && stateValue !== "";
    } else {
      isValid = stateValue !== null && stateValue > 0;
    }

    this.setState({
      [stateName]: stateValue,
      [stateName + "IsValid"]: isValid
    });
  }

  storeUserData = async () => {
    try {
      await AsyncStorage.setItem(Keys.NAME, this.state.name);
      await AsyncStorage.setItem(Keys.SALARY_RATE_PER_HOUR, this.state.salary);
    } catch (error) {
      alert("Not able to store data on device");
    }
  };

  async onPressSave() {
    if (this.isFormValid()) {
      await this.storeUserData();
      this.refs.toast.show("Saved successfully!");
    }
  }

  render() {
    return (
      <View>
        <Text> Hi, {this.state.name} </Text>
        <View style={styles.textInputContainer}>
          <CustomInput
            placeholder="Enter your name"
            onChangeText={value => this.handleOnChange("name", value)}
            value={this.state.name}
            isvalidcustom={this.state.nameIsValid ? 1 : 0}
          />
          <CustomInput
            placeholder="Enter your salary per hour"
            onChangeText={value => this.handleOnChange("salary", value)}
            value={this.state.salary}
            isvalidcustom={this.state.salaryIsValid ? 1 : 0}
            keyboardType={"numeric"}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton title="Save" onPress={() => this.onPressSave()} />
          <Toast
            ref="toast"
            style={{ backgroundColor: "gray" }}
            position="bottom"
            positionValue={300}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{ color: "white" }}
          />
        </View>
        <View>
          <Text>History of goods</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputContainer: {},
  buttonContainer: {}
});
