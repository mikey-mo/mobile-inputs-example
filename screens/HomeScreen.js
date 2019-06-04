import React from 'react';
import {
  View,
} from 'react-native';
import { Input } from 'react-native-elements';
import MobileInputs from '../components/mobile-inputs';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <MobileInputs
          onEndNumInput={(value) => console.log(value)}
        />
        <MobileInputs
          disableNumError
          onEndNumInput={(value) => console.log(value)}
        />
        <View>
          <Input
            onEndEditing={() => {
              console.log(this.mobileIntCont.mobileInt.inputRef.focus());
            }}
          />
          <MobileInputs
            ref={(el) => this.mobileIntCont = el }
            onEndNumInput={(value) => console.log(value)}
          />
        </View>
      </View>
    );
  }
};
