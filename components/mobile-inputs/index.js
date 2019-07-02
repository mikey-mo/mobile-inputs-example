/* eslint-disable */
import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { AntDesign } from 'react-native-vector-icons';
/* eslint-enable */
import PropTypes from 'prop-types';
import { Input } from 'react-native-elements';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import RNPickerSelect from 'react-native-picker-select';

import countryCodes from './country-codes';
import errorStrings from './error-strings';
import validator from './validator';
import formatter from './formatter';
import cleaner from './cleaner';

const isAndroid = Platform.OS === 'android';

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '10@ms',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputs: {
    fontSize: '14@ms',
  },
  intContainer: {
    width: '22%',
    height: '40@ms',
    borderBottomWidth: '1@ms',
    borderBottomColor: '#86939e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputNumContainer: {
    height: '40@ms',
    borderBottomWidth: '1@ms',
    borderBottomColor: '#86939e',
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  numContainer: {
    width: '75%',
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
});

class MobileInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        int: '+1',
        num: '',
      },
      errors: {
        numEr: '',
      },
    };
  }

  performValidation = () => {
    const { inputs } = this.state;
    const { disableFormatter } = this.props;
    const { num, int } = inputs;
    if (num.length < 1) return;
    const isValid = validator({ num, int });
    if (isValid) {
      this.validationPassed();
      if (disableFormatter === false) this.formatValidatedValue(num);
    } else {
      this.validationFailed();
      this.formFailedValue();
    }
  }

  formFailedValue = () => {
    const { inputs } = this.state;
    const { num } = inputs;
    const newInput = { ...inputs };
    newInput.num = cleaner(num);
    this.setState({
      inputs: newInput,
    });
  }

  formatValidatedValue = () => {
    const { inputs } = this.state;
    const { int, num } = inputs;
    const formattedValue = formatter({ int, num });
    const newInput = { ...inputs };
    newInput.num = formattedValue;
    this.setState({
      inputs: newInput,
    });
  }

  validationFailed = () => {
    const state = { ...this.state };
    const { errors } = state;
    errors.numEr = errorStrings.numEr;
    this.setState({
      errors,
    });
  }

  validationPassed = () => {
    const { onEndNumInput, splitIntAndNum } = this.props;
    const state = { ...this.state };
    const { errors } = state;
    errors.numEr = '';
    this.setState({
      errors,
    }, () => {
      const { inputs } = this.state;
      const { int, num } = inputs;
      if (splitIntAndNum === true) {
        return onEndNumInput({ int, num });
      }
      return onEndNumInput(`${int} ${num}`);
    });
  }

  onInputChange = (value) => {
    const state = { ...this.state };
    const { inputs } = state;
    inputs.num = value;
    this.setState({
      inputs,
    });
  }

  onRNPickerValueChange = (inputs, value) => {
    const newInput = { ...inputs };
    newInput.int = value;
    this.setState({
      inputs: newInput,
    }, () => {
      this.performValidation();
      this.mobileNum.focus();
    });
  }

  onInputEnd = () => {
    const { nextRefFocus } = this.props;
    this.performValidation();
    nextRefFocus();
  }

  render() {
    const {
      inputs,
      errors,
    } = this.state;
    const {
      num,
    } = inputs;
    const {
      numEr,
    } = errors;
    const {
      containerStyle,
      placeholderNum,
      intContainerStyle,
      numContainerStyle,
      inputNumContainerStyle,
      iosInputStyle,
      androidInputStyle,
      errorStyleNum,
      shake,
      disableNumError,
      inputStyle,
      pickerProps,
      inputProps,
      pickerIconName,
      pickerIconColor,
      hidePickericon,
    } = this.props;

    return (
      <View style={[styles.container, { ...containerStyle }]}>
        <View style={[styles.intContainer, { ...intContainerStyle }]}>
          <RNPickerSelect
            { ...pickerProps }
            placeholder={{}}
            items={countryCodes}
            onValueChange={(value) => {
              const newInput = { ...inputs };
              newInput.int = value;
              this.setState({
                inputs: newInput,
              }, () => {
                this.performValidation();
                isAndroid ? this.mobileNum.focus() : null;
              });
            }}
            onDonePress={() => this.mobileNum.focus()}
            style={{
              inputIOS: {
                paddingTop: moderateScale(10),
                fontSize: moderateScale(14),
                ...iosInputStyle,
              },
              inputAndroid: {
                fontSize: moderateScale(14),
                ...androidInputStyle,
              },
            }}
            Icon={() => null}
            useNativeAndroidPickerStyle={false}
            ref={(el) => { this.mobileInt = el; }}
          />
          {!hidePickericon
            && (
              <AntDesign
                name={pickerIconName}
                style={{ color: pickerIconColor }}
              />
            )}
        </View>
        <Input
          { ...inputProps }
          inputStyle={[styles.inputs, { ...inputStyle }]}
          onEndEditing={this.onInputEnd}
          ref={(mobileNum) => { this.mobileNum = mobileNum; }}
          keyboardType="number-pad"
          maxLength={18}
          value={num}
          onChangeText={text => this.onInputChange(text)}
          inputContainerStyle={[styles.inputNumContainer, { ...inputNumContainerStyle }]}
          containerStyle={[styles.numContainer, { ...numContainerStyle }]}
          shake={shake}
          placeholder={placeholderNum}
          errorMessage={!disableNumError ? numEr : null}
          errorStyle={[errorStyleNum]}
        />
      </View>
    );
  }
}

MobileInputs.defaultProps = {
  inputProps: {},
  pickerProps: {},
  splitIntAndNum: false,
  onEndNumInput: () => null,
  pickerInputStyle: {},
  placeholderNum: '(718) 111 2222',
  containerStyle: {},
  shake: false,
  numContainerStyle: {},
  inputNumContainerStyle: {},
  intContainerStyle: {},
  errorStyleNum: {},
  nextRefFocus: () => null,
  disableNumError: false,
  disableFormatter: false,
  iosInputStyle: {},
  androidInputStyle: {},
  pickerIconName: 'caretdown',
  pickerIconColor: 'black',
  hidePickericon: false,
};

MobileInputs.propTypes = {
  inputProps: PropTypes.shape({}),
  pickerProps: PropTypes.shape({}),
  splitIntAndNum: PropTypes.bool,
  pickerInputStyle: PropTypes.shape({}),
  onEndNumInput: PropTypes.func,
  placeholderNum: PropTypes.string,
  containerStyle: PropTypes.shape({}),
  shake: PropTypes.bool,
  numContainerStyle: PropTypes.shape({}),
  inputNumContainerStyle: PropTypes.shape({}),
  intContainerStyle: PropTypes.shape({}),
  errorStyleNum: PropTypes.shape({}),
  nextRefFocus: PropTypes.func,
  disableNumError: PropTypes.bool,
  disableFormatter: PropTypes.bool,
  inputStyle: PropTypes.shape({}),
  pickerIconName: PropTypes.string,
  pickerIconColor: PropTypes.string,
};

export default MobileInputs;
