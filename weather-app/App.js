import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Weather from "./Weather";

export default class App extends Component {
  state = {
    isLoaded: true
  };
  render() {
    const { isLoaded } = this.state;
    return (
      <View style={styles.container}>
        {isLoaded ? <Weather/> : (
          <View style={styles.loading}>
            
            <Text style={styles.loadingText}>날씨 불러오는 중</Text>
          </View>
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
  loading: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    paddingLeft: 24
  },
  loadingText: {
    fontSize: 30,
    paddingTop: 120
  },

});
