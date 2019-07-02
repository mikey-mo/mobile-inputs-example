import { parsePhoneNumberFromString } from 'libphonenumber-js';

const formatter = ({ int, num }) => {
  const phone = parsePhoneNumberFromString(`${int}${num}`);
  let returnNum = num;
  if (phone.isValid()) returnNum = phone.formatNational();
  if (returnNum[0] === '0' && int !== '1') {
    const perensZero = '(0)';
    returnNum = perensZero.concat(phone.formatNational().substring(1));
  };
  return returnNum;
}

export default formatter;
