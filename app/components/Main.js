import React, { Component } from "react";
import {
  Alert,
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View
} from "react-native";

export default class Main extends Component {
  constructor(props) {

    super(props);
    this._onPressButton = this._onPressButton.bind(this)
    this.state = {
      page: this.props.page
    };
  }

 _onPressButton() {
  console.log("it has indeed been pressed");
  this.props.changePage(1)
  console.log(this.props.page)
  }

  static defaultProps = {
    message: "Hi there"
  };

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Maps</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    paddingTop: 60,
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 10,
    margin: 20
  },
  buttonText: {
    padding: 20,
    color: 'white',
    fontSize: 30,
  }
});

AppRegistry.registerComponent("Main", () => Main);
