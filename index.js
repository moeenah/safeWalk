import React, {Component} from 'react';
import { Text, AppRegistry, View } from 'react-native';
import Title from './app/components/Component1'

export default class Safewalk extends Component<Props> {
  render() {
    return(
  <View>
    <Title />
    <Text>Hello Component!</Text>
    </View>
    );
  }
}


AppRegistry.registerComponent('Safewalk', () => Safewalk);
