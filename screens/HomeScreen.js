import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import MobileInputs from '../components/mobile-inputs';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <MobileInputs />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
});
