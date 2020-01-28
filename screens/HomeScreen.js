import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from "react-native";
import Colors from "../constants/Colors";
import { CustomInput } from "../components/CustomInput";
import { CustomButton } from "../components/CustomButton";
import Keys from "../constants/Keys";
import { StyledText } from "../components/StyledText";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      salary: "",
      workload: "",
      nameIsValid: true,
      salaryIsValid: true,
      workloadIsValid: true
    };
  }

  async componentDidMount() {
    await this.getIsDataFilled();
  }

  // create a function that saves your data asyncronously. TODO: Make it more secure
  storeUserData = async () => {
    try {
      await AsyncStorage.setItem(Keys.NAME, this.state.name);
      await AsyncStorage.setItem(Keys.SALARY_RATE_PER_HOUR, this.state.salary);
      await AsyncStorage.setItem(Keys.WORKLOAD_PER_WEEK, this.state.workload);
      await AsyncStorage.setItem(Keys.IS_DATA_FILLED, "true");
    } catch (error) {
      alert("Not able to store data on device");
    }
  };

  // fetch the data back asyncronously. TODO: Make it more secure
  getIsDataFilled = async () => {
    try {
      const value = await AsyncStorage.getItem(Keys.IS_DATA_FILLED);
      if (value !== null) {
        // Our data is fetched successfully
        if (value == "true") {
          console.log("Go to calculator");
        } else {
          //stay here and ask for user data
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  async onPress() {
    if (this.isFormValid()) {
      await this.storeUserData();
      this.props.navigation.navigate("Calculator");
      console.log(this.props);
    }
  }

  isFormValid() {
    let nameIsValid,
      salaryIsValid,
      workloadIsValid = false;
    if (this.state.name !== null && this.state.name !== "") {
      nameIsValid = true;
    }
    if (this.state.salary !== null && this.state.salary > 0) {
      salaryIsValid = true;
    }
    if (this.state.workload !== null && this.state.workload > 0) {
      workloadIsValid = true;
    }

    this.setState({ nameIsValid, salaryIsValid, workloadIsValid });

    if (nameIsValid && salaryIsValid && workloadIsValid) {
      return true;
    }
    return false;
  }

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

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <StyledText style={styles.title}>Time Buys</StyledText>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.fundamentalsContainer}>
            <StyledText style={styles.text}>
              These ones are the fundamentals that support why TimeBuys is so
              good!
            </StyledText>
          </View>

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
            <CustomInput
              placeholder="Enter your workload per week in hours"
              onChangeText={value => this.handleOnChange("workload", value)}
              value={this.state.workload}
              isvalidcustom={this.state.workloadIsValid ? 1 : 0}
              keyboardType={"numeric"}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <CustomButton title="Let's start!" onPress={() => this.onPress()} />
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  textInputContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 10
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  fundamentalsContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  text: {
    color: Colors.tertiary
  },
  title: {
    fontSize: 24,
    color: Colors.secondary,
    fontWeight: "500",
    lineHeight: 24,
    textAlign: "center"
  },
  buttonContainer: {
    alignItems: "stretch"
  },
  button: {
    padding: "50"
  }
});
