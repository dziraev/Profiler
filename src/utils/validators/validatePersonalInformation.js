import { checkIsValidName, trimValues } from './validators';

export const validatePersonalInformation = (values) => {
  const trimmedValues = trimValues(values);
  let errors = {};

  if (!values.name) {
    errors.name = 'Required field';
  } else if (!checkIsValidName(trimmedValues.name)) {
    errors.name = 'Invalid name';
  }

  if (!values.surname) {
    errors.surname = 'Required field';
  } else if (!checkIsValidName(trimmedValues.surname)) {
    errors.surname = 'Invalid surname';
  }

  if (!values.position) {
    errors.position = 'Required field';
  }

  if (!values.country) {
    errors.country = 'Required field';
  }

  if (!values.city) {
    errors.city = 'Required field';
  } else if (!checkIsValidName(trimmedValues.city)) {
    errors.city = 'Invalid city name';
  }

  return errors;
};
