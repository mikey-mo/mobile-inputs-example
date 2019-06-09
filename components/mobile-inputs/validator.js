const validations = {
  '+1': (value) => {
    if (value.length !== 10) return false;
    return !!value;
  },
  '+44': (value) => {
    if (value.length !== 11) return false;
    if (value[0] !== '0' || value[1] !== '7') return false;
    return !!value;
  },
  '+33': (value) => {
    if (value.length !== 11) return false;
    if (value[0] !== '0') return false;
    if (value[1] !== '7' && value[1] !== '6') return false;
    return !!value;
  },
  '+61': (value) => {
    if (value.length !== 10) return false;
    if (value[0] !== '0' || value[1] !== '4') return false;
    return !!value;
  },
  '+49': (value) => {
    if (value.length !== 10) return false;
    if (value[0] !== '0' || value[1] !== '1') return false;
    if (value[2] !== '5' && value[2] !== '6') return false;
    return !!value;
  },
  '+46': (value) => {
    if (value.length !== 10) return false;
    if (value[0] !== '0') return false;
    if (value[1] !== '7') return false;
    return !!value;
  },
};

export default validations;
