import React, { Component } from "react";
import { AppRegistry, Text, View } from "react-native";

export default class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message
    };
  }

  static defaultProps = {
    message: "Hi there"
  }

  render() {
    return (
      <View>
        <Text>{this.props.message}</Text>
        <Text></Text>
      </View>
    );
  }
}
AppRegistry.registerComponent("Title", () => Title);
