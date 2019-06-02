import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';

import errorStrings from './error-strings';
import validator from './validator';
import formatter from './formatter';
import cleaner from './cleaner';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  inputs: {
    fontSize: '14@ms',
  },
  intContainer: {
    flex: 25,
  },
  numContainer: {
    flex: 75,
  },
});

class MobileInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        int: '',
        num: '',
      },
      errors: {
        intEr: '',
        numEr: '',
      },
    };
  }

  performValidation = (value, type) => {
    const { disableFormatter } = this.props;
    const { inputs } = this.state;
    const { int } = inputs;
    if (type === 'intEr') {
      try {
        validator[int](value);
        this.validationPassed(type);
      } catch (e) {
        this.validationFailed(type);
      }
    } else {
      try {
        if (validator[int](value) === true) {
          this.validationPassed(type, value);
          !disableFormatter ? this.formatValidatedValue(value) : value;
        } else {
          this.validationFailed(type);
          this.formFailedValue(value);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  formFailedValue = (value) => {
    const { inputs } = this.state;
    const cleanValue = cleaner(value);
    const newInput = { ...inputs };
    newInput.num = cleanValue;
    this.setState({
      inputs: newInput,
    });
  }

  formatValidatedValue = (value) => {
    const { inputs } = this.state;
    const { int } = inputs;
    const formattedValue = formatter[int](value);
    const newInput = { ...inputs };
    newInput.num = formattedValue;
    this.setState({
      inputs: newInput,
    });
  }

  validationFailed = (type) => {
    const state = { ...this.state };
    const { errors } = state;
    errors[type] = errorStrings[type];
    this.setState({
      errors,
    });
  }

  validationPassed = (type) => {
    const state = { ...this.state };
    const { errors } = state;
    errors[type] = '';
    this.setState({
      errors,
    });
  }

  onInputChange = (value, type) => {
    const state = { ...this.state };
    const { inputs } = state;
    inputs[type] = value;
    this.setState({
      inputs,
    });
  }

  onInputEnd = (event, erType, ref) => {
    const { text } = event.nativeEvent;
    const cleanText = cleaner(text);
    this.performValidation(cleanText, erType);
    if (ref) this[ref].focus();
  }

  render() {
    const {
      inputs,
      errors,
    } = this.state;
    const {
      int,
      num,
    } = inputs;
    const {
      intEr,
      numEr,
    } = errors;
    const {
      containerStyle,
      placeholderInt,
      placeholderNum,
      intContainerStyle,
      numContainerStyle,
      errorStyleInt,
      errorStyleNum,
      shake,
      nextRef,
      disableIntError,
      disableNumError,
      inputStyles,
    } = this.props;

    return (
      <View style={[styles.container, { ...containerStyle }]}>
        <Input
          inputStyle={[styles.inputs, { ...inputStyles }]}
          onEndEditing={(event) => { this.onInputEnd(event, 'intEr', 'mobileNum'); }}
          ref={(mobileInt) => { this.mobileInt = mobileInt; }}
          keyboardType="number-pad"
          maxLength={4}
          value={int}
          onChangeText={text => this.onInputChange(text, 'int')}
          containerStyle={[styles.intContainer, { ...intContainerStyle }]}
          shake={shake}
          placeholder={placeholderInt}
          errorMessage={!disableIntError ? intEr : null}
          errorStyle={[errorStyleInt]}
        />
        <Input
          inputStyle={[styles.inputs, { ...inputStyles }]}
          onEndEditing={(event) => { this.onInputEnd(event, 'numEr', nextRef); }}
          ref={(mobileNum) => { this.mobileNum = mobileNum; }}
          keyboardType="number-pad"
          maxLength={18}
          value={num}
          onChangeText={text => this.onInputChange(text, 'num')}
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
  placeholderInt: '+1',
  placeholderNum: '(718) 111 2222',
  containerStyle: {},
  shake: false,
  numContainerStyle: {},
  intContainerStyle: {},
  errorStyleInt: {},
  errorStyleNum: {},
  nextRef: '',
  disableIntError: false,
  disableNumError: false,
  disableFormatter: false,
  inputStyles: {},
};

MobileInputs.propTypes = {
  placeholderInt: PropTypes.string,
  placeholderNum: PropTypes.string,
  containerStyle: PropTypes.shape({}),
  shake: PropTypes.bool,
  numContainerStyle: PropTypes.shape({}),
  intContainerStyle: PropTypes.shape({}),
  errorStyleInt: PropTypes.shape({}),
  errorStyleNum: PropTypes.shape({}),
  nextRef: PropTypes.string,
  disableIntError: PropTypes.bool,
  disableNumError: PropTypes.bool,
  disableFormatter: PropTypes.bool,
  inputStyles: PropTypes.shape({}),
};

export default MobileInputs;
