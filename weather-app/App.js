import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Weather from "./Weather";
import { LinearGradient } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class App extends Component {
  state = {
    isLoaded: false,
    error: null
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          isLoaded: true,
        });
      },
      error => {
        this.setState({
          error: error
        });
      }
    );
  }
  render() {
    const { isLoaded, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <Weather />
        ) : (
          <LinearGradient
            colors={["#a18cd1", "#fbc2eb"]}
            style={styles.loading}
          >
            <View style={styles.loading}>
              <Text style={styles.loadingText}>
                Getting Current Location...
              </Text>
              {error ? (
                <View >
                  <MaterialCommunityIcons
                    color="red"
                    size={144}
                    name="account-alert"
                  />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}
            </View>
          </LinearGradient>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // Default value of flexDirection is 'column'
  },
  errorText: {
    color: "red",
    backgroundColor: "transparent",
    fontSize: 25,
    fontWeight: "800"
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20
  },
  loadingText: {
    fontSize: 25,
    paddingBottom: 70,
    color: "white",
    fontWeight: "700"
  }
});
