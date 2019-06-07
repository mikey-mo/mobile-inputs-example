import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Picker } from 'react-native';
import { Input } from 'react-native-elements';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import RNPickerSelect from 'react-native-picker-select';

import countryCodes from './country-codes';
import errorStrings from './error-strings';
import validator from './validator';
import formatter from './formatter';
import cleaner from './cleaner';

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
    justifyContent: 'center',
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
    if(num.length < 1) return;
    if (validator[int](cleaner(num)) === true) {
      this.validationPassed();
      !disableFormatter ? this.formatValidatedValue(num) : num;
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
    const formattedValue = formatter[int](cleaner(num));
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
    const { onEndNumInput } = this.props;
    const state = { ...this.state };
    const { errors } = state;
    errors.numEr = '';
    this.setState({
      errors,
    }, () => {
      const { inputs } = this.state;
      const { int, num } = inputs;
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
      pickerInputStyle,
      errorStyleNum,
      shake,
      disableNumError,
      inputStyle,
    } = this.props;

    return (
      <View style={[styles.container, { ...containerStyle }]}>
        <View style={[styles.intContainer, { ...intContainerStyle }]}>
          <RNPickerSelect
            placeholder={{}}
            items={countryCodes}
            onValueChange={(value) => {
              const { inputs } = this.state;
              const newInput = { ...inputs };
              newInput.int = value;
              this.setState({
                inputs: newInput,
              }, () => {
                this.performValidation();
                this.mobileNum.focus();
              })}}
            style={{
              inputIOS: {
                fontSize: moderateScale(14),
                ...pickerInputStyle,
              },
              inputAndroid: {
                fontSize: moderateScale(14),
                ...pickerInputStyle,
              },
            }}
            Icon={() => null}
            value={this.state.value}
            useNativeAndroidPickerStyle={false}
            ref={(el) => this.mobileInt = el }
          />
        </View>
        <Input
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
  onEndNumInput: () => null,
  placeholderNum: '(718) 111 2222',
  containerStyle: {},
  shake: false,
  numContainerStyle: {},
  inputNumContainerStyl: {},
  intContainerStyle: {},
  errorStyleNum: {},
  nextRefFocus: () => null,
  disableNumError: false,
  disableFormatter: false,
  inputStyle: {},
};

MobileInputs.propTypes = {
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
};

export default MobileInputs;
