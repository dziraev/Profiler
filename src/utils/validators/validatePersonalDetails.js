import { emailValidator } from './validators';

const checkIsValidName = (value) => {
  const REGEXP = /^[a-z]+(([ -])?[a-z]+)*$/i;
  return REGEXP.test(value);
};

export const validatePersonalDetails = (values) => {
  let errors = {};

  if (!checkIsValidName(values.name.trim()) && values.name) {
    errors.name = 'Invalid name';
  }

  if (!checkIsValidName(values.surname.trim()) && values.surname) {
    errors.surname = 'Invalid surname';
  }

  if (!emailValidator(values.email.trim()) && values.email) {
    errors.email = 'Invalid email. Example of the correct variant: example@example.com';
  }

  if (!/^\d+$/.test(values.cellPhone) && values.cellPhone) {
    errors.cellPhone = true;
    errors.phoneCode = 'Invalid cell phone number. Example of the correct variant: 29233XXXX';
  }

  return errors;
};
