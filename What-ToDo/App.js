import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView
} from "react-native";
import { AppLoading } from "expo";
import Todo from "./ToDo";

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newTodo: "",
    loadedTodos: false
  };

  componentDidMount = () => {
    this._loadToDos();
  }
  render() {
    const { newTodo, loadedTodos } = this.state;
    if (!loadedTodos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>What To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newTodo}
            onChangeText={this._controllNewTodo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
          />
          <ScrollView contentContainerStyle={styles.todo}>
            <Todo text={"Hello i'm a todo"} />
          </ScrollView>
        </View>
      </View>
    );
  }
  _controllNewTodo = text => {
    this.setState({
      newTodo: text
    });
  };
  _loadToDos = () => {
    
    this.setState({
      loadedTodos: true,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a5276",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "400",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 20
  },
  todo: {
    alignItems: "center"
  }
});
