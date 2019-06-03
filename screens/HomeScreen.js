import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import MobileInputs from '../components/mobile-inputs';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MobileInputs
          onEndInput={(value) => console.log(value)}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
