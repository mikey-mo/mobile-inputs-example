import { parsePhoneNumberFromString } from 'libphonenumber-js';

const validator = ({ int, num }) => {
  const phone = parsePhoneNumberFromString(`${int}${num}`);
  return phone.isValid();
}

export default validator;
