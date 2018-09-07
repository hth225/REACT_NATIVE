import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
  AsyncStorage
} from "react-native";
import { AppLoading } from "expo";
import Todo from "./ToDo";
import uuidv1 from "uuid/v1";

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newTodo: "",
    loadedTodos: false,
    toDos: {}
  };

  componentDidMount = () => {
    this._loadToDos();
  };
  render() {
    const { newTodo, loadedTodos, toDos } = this.state;
    console.log(toDos);
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
            onSubmitEditing={this._addToDo}
            underlineColorAndroid={"transparent"}
          />
          <ScrollView contentContainerStyle={styles.todo}>
            {Object.values(toDos)
              .reverse()
              .map(toDo => (
                <Todo
                  key={toDo.id}
                  deleteTodo={this._deleteTodo}
                  uncompleteTodo={this._uncompleteTodo}
                  completeTodo={this._completeTodo}
                  updateTodo={this._updateTodo}
                  {...toDo}
                />
              ))}
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
  _loadToDos = async () => {
    try {
      const toDos = await AsyncStorage.getItem("toDos");
      const parsedToDos = JSON.parse(toDos);
      this.setState({
        loadedTodos: true,
        toDos: parsedToDos || {}
      });
    } catch (err) {
      console.log(err);
    }
  };
  _addToDo = () => {
    const { newTodo } = this.state;
    if (newTodo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newTodoObject = {
          [ID]: {
            id: ID,
            iscompleted: false,
            text: newTodo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newTodo: "",
          toDos: {
            ...prevState.toDos,
            ...newTodoObject
          }
        };
        this._saveTodos(newState.toDos);
        return { ...newState };
      });
    }
  };
  _deleteTodo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };
  _uncompleteTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            iscompleted: false
          }
        }
      };
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };
  _completeTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            iscompleted: true
          }
        }
      };
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };
  _updateTodo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            text: text
          }
        }
      };
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };
  _saveTodos = newTodos => {
    const saveTodos = AsyncStorage.setItem("toDos", JSON.stringify(newTodos));
  };
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
