import React, { Component, DeviceEventEmitter } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Picker
} from "react-native";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
    };
  }

  _onPressButton() {
    this.props.changePage(0);
  }

  componentWillUnmount() {}

  componentDidMount() {}

  returnUserModeSettings(){
    if(this.props.userMode === 1){
      return "Pedestrian Mode"
    }
    if(this.props.userMode === 2){
      return "Vehicle Mode"
    }
  }

  changeUserMode() {
    this.props.changeUserMode();
  }

//change time to reactivate dagner point alert
  returnTimeInt(){
    if(this.props.timeInt === 300){
      return "5 Minutes"
    }
    if(this.props.timeInt === 1800){
      return "30 Minutes"
    }
    if(this.props.timeInt === 3600){
      return "1 Hour"
    }
    if(this.props.timeInt === 10800){
      return "3 Hours"
    }    if(this.props.timeInt === 43200){
      return "12 Hours"
    }
    if(this.props.timeInt === 86400){
      return "24 Hours"
    }
  }

  changeTimeInt() {
    this.props.changeTimeInt();
  }
//change time to reactivate dagner point alert

  render() {
    return (
      <View>

        <TouchableHighlight
          onPress={this.changeUserMode.bind(this)}
          underlayColor="white"
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>{this.returnUserModeSettings()}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={this.changeTimeInt.bind(this)}
          underlayColor="white"
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>{this.returnTimeInt()}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={this._onPressButton.bind(this)}
          underlayColor="white"
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Go Back</Text>
          </View>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    backgroundColor: "#2196F3",
    borderRadius: 10,
    margin: 20
  },
  buttonText: {
    padding: 20,
    color: "white",
    fontSize: 30
  },
});

AppRegistry.registerComponent("Settings", () => Settings);