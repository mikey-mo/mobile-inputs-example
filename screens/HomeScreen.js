import React from 'react';
import {
  View,
} from 'react-native';
import { Input } from 'react-native-elements';
import MobileInputs from '../components/mobile-inputs';
// import MobileInputs from 'react-native-mobile-inputs';

export default class HomeScreen extends React.Component {
  nextRefFocus = () => {
    this.nextRef.focus();
  };

  render() {
    return (
      <View>
        <Input />
        <MobileInputs
          onEndNumInput={(value) => console.log(value)}
        />
        <MobileInputs
          // disableNumError
          // disableFormatter
          splitIntAndNum
          nextRefFocus={this.nextRefFocus}
          onEndNumInput={(value) => console.log(value)}
        />
        <Input
          ref={(el) => this.nextRef = el}
        />
      </View>
    );
  }
};
