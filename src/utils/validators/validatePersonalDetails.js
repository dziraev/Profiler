import { emailValidator, checkIsValidName, trimValues } from './validators';

export const validatePersonalDetails = (values) => {
  const trimmedValues = trimValues(values);
  let errors = {};

  if (!checkIsValidName(trimmedValues.name) && values.name) {
    errors.name = 'Invalid name';
  }

  if (!checkIsValidName(trimmedValues.surname) && values.surname) {
    errors.surname = 'Invalid surname';
  }

  if (!emailValidator(trimmedValues.email) && values.email) {
    errors.email = 'Invalid email. Example of the correct variant: example@example.com';
  }

  if (!/^\d+$/.test(values.cellPhone) && values.cellPhone) {
    errors.cellPhone = true;
    errors.phoneCode = 'Invalid cell phone number. Example of the correct variant: 29233XXXX';
  }

  return errors;
};
