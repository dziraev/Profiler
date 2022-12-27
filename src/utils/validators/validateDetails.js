import { emailValidator } from './validators';

const checkIsValidName = (value) => {
  const REGEXP = /^[a-z]+(([ -])?[a-z]+)*$/i;
  return REGEXP.test(value);
};

export const validateDetails = (values) => {
  let errors = {};

  if (!checkIsValidName(values.name.trim()) && values.name) {
    errors.name =
      'The user name is was entered incorrectly, it is allowed to use Latin letters, dashes and spaces.';
  }

  if (!checkIsValidName(values.surname.trim()) && values.surname) {
    errors.surname =
      'The surname of the user was entered incorrectly, it is allowed to use Latin letters, dashes and spaces.';
  }

  if (!emailValidator(values.email.trim()) && values.email) {
    errors.email =
      'The email of the user was entered incorrectly. Email address  must have four parts Recipient name, @ symbol, Domain name, Top-level domain';
  }

  if (!/^\d+$/.test(values.cellPhone) && values.cellPhone) {
    errors.cellPhone = true;
    errors.phoneCode =
      "The user's phone number was entered incorrectly. It is not allowed to use a dashes and a spaces between numbers.";
  }

  return errors;
};
