import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Input } from 'react-native-elements';
import { moderateScale } from 'react-native-size-matters';
import MobileInputs from '../components/mobile-inputs';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <MobileInputs
          onEndInput={(value) => console.log(value)}
        />
        <MobileInputs
          disableNumError
          onEndInput={(value) => console.log(value)}
        />
        <MobileInputs
          onEndInput={(value) => console.log(value)}
        />
      </View>
    );
  }
};
