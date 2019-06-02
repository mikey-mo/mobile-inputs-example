const cleaner = value => value.replace(/\D/g, '');

const validations = {
  "+1": (value) => {
    const cleanValue = cleaner(value);
    if (cleanValue.length !== 10) return false;
    return !!value;
  },
  "+44": (value) => {
    const cleanValue = cleaner(value);
    if (cleanValue.length < 11) return false;
    if (cleanValue[0] !== '0') return false;
    return !!value;
  },
};

export default validations;
