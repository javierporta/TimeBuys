import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomInput } from "./CustomInput";
import { CustomButton } from "./CustomButton";
import Keys from "../constants/Keys";
import Colors from "../constants/Colors";
import moment from "moment";
import { StyledText } from "./StyledText";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodName: "",
      goodNameIsValid: true,
      goodPrice: "",
      goodPriceIsValid: true,
      timeToBuy: 0,
      isCalculating: true
    };
  }

  handleOnChange(stateName, stateValue) {
    let isValid = true;
    if (stateName === "goodName") {
      isValid = stateValue !== null && stateValue !== "";
    } else {
      isValid = stateValue !== null && stateValue > 0;
    }

    this.setState({
      [stateName]: stateValue,
      [stateName + "IsValid"]: isValid
    });
  }

  async onPressCalculate() {
    if (this.isFormValid()) {
      await this.calculate();
    }
  }

  async calculate() {
    //It should be a server side function (?)

    let userData = await this.getUserData();
    if (userData !== null) {
      const price = this.state.goodPrice;
      const name = this.state.goodName;
      const salary = userData.salaryRatePerHour;

      const totalHours = price / salary;

      let timeToBuy = moment.duration(totalHours, "hours").humanize(); // a day

      this.setState({
        timeToBuy,
        isCalculating: false
      });
    } else {
      // some data is vad, review settings
      console.error("smth went wrong");
    }
  }

  // fetch the data back asyncronously. TODO: Make it more secure
  getUserData = async () => {
    try {
      const isDataFilled = await AsyncStorage.getItem(Keys.IS_DATA_FILLED);
      if (isDataFilled !== null) {
        // Our data is fetched successfully
        if (isDataFilled == "true") {
          const salaryRatePerHour = await AsyncStorage.getItem(
            Keys.SALARY_RATE_PER_HOUR
          );
          const workloadPerWeek = await AsyncStorage.getItem(
            Keys.WORKLOAD_PER_WEEK
          );
          return {
            salaryRatePerHour,
            workloadPerWeek
          };
        } else {
          //TODO: ask for user data, go to home or settings
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  isFormValid() {
    let goodNameIsValid,
      goodPriceIsValid = false;
    if (this.state.goodName !== null && this.state.goodName !== "") {
      goodNameIsValid = true;
    }
    if (this.state.goodPrice !== null && this.state.goodPrice > 0) {
      goodPriceIsValid = true;
    }

    this.setState({ goodNameIsValid, goodPriceIsValid });

    if (goodNameIsValid && goodPriceIsValid) {
      return true;
    }
    return false;
  }

  onPressYes() {
    this.setState({ isCalculating: true });
  }

  onPressNo() {
    this.setState({ isCalculating: true });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.isCalculating && (
          <View>
            <View>
              <StyledText> What would you like to buy?</StyledText>
              <StyledText>
                {" "}
                How does it work? Let us know what do you want to buy and how
                much (money) does it cost. We will take care of calculating how
                much time do you have to work so you can decide if you defintely
                want to buy it or not =)
              </StyledText>
            </View>
            <View>
              <CustomInput
                placeholder="Name of the good"
                onChangeText={value => this.handleOnChange("goodName", value)}
                value={this.state.goodName}
                isvalidcustom={this.state.goodNameIsValid ? 1 : 0}
              />
              <CustomInput
                placeholder="Price of the good"
                onChangeText={value => this.handleOnChange("goodPrice", value)}
                value={this.state.goodPrice}
                isvalidcustom={this.state.goodPriceIsValid ? 1 : 0}
                keyboardType={"numeric"}
              />
              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Calculate"
                  onPress={() => this.onPressCalculate()}
                />
              </View>
            </View>
          </View>
        )}
        {!this.state.isCalculating && (
          <View>
            <View>
              <Text>
                You need {this.state.timeToBuy} to buy {this.state.goodName}
              </Text>
              <Text>Would you buy it?</Text>
              <View style={styles.yesNoContainer}>
                <CustomButton
                  title="Yes"
                  color="#008000"
                  onPress={() => this.onPressYes()}
                />
                <CustomButton
                  title="No"
                  color="#FF0000"
                  onPress={() => this.onPressNo()}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //  backgroundColor: Colors.background
  },
  text: {
    color: Colors.tertiary
  },
  subtitle: {
    fontSize: 24,
    color: Colors.secondary,
    fontWeight: "500",
    lineHeight: 24,
    textAlign: "center"
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  yesNoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    padding: "50"
  }
});
