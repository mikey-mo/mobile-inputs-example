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
        <View>
          <MobileInputs
            onEndInput={(value) => console.log(value)}
            pickerStyle={{
              fontSize: moderateScale(10),
              color: 'red',
              borderBottomColor: 'coral',
            }}
          />
          <MobileInputs
            disableNumError
            pickerStyle={{
              fontSize: moderateScale(10),
              color: 'green',
              borderBottomColor: 'purple',
            }}
            onEndInput={(value) => console.log(value)}
          />
        </View>
        <View>
          <MobileInputs
            onEndInput={(value) => console.log(value)}
            pickerStyle={{
              fontSize: moderateScale(10),
              color: 'red',
              borderBottomColor: 'coral',
            }}
          />
        </View>
      </View>
    );
  }
};

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//   },
// });
