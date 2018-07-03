import React, { Component } from "react";
import { AppRegistry, View } from "react-native";
import PedMap from "./app/components/PedMap";
import Main from "./app/components/Main";

export default class Safewalk extends Component<Props> {
  constructor() {
    super();
    this.changePage = this.changePage.bind(this);
    this.state = {
      page: 1
    };
  }

  currentPage() {
    if (this.state.page === 1) {
      return <PedMap page={this.state.page} changePage={this.changePage} />;
    }
    return <Main page={this.state.page} changePage={this.changePage} />;
  }

  changePage(newpage) {
    this.setState({ page: newpage });
  }

  render() {
    return <View>{this.currentPage()}</View>;
  }
}

AppRegistry.registerComponent("Safewalk", () => Safewalk);
