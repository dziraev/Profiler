import { emailValidator, trimValues } from './validators';

export const validateContacts = (values) => {
  const trimmedValues = trimValues(values);
  let errors = {};

  if (!values.email) {
    errors.email = 'Required field';
  } else if (!emailValidator(trimmedValues.email)) {
    errors.email = 'Invalid email. Example of the correct variant: example@example.com';
  }

  if (!values.phoneNumber) {
    errors.phoneCode = 'Required field';
    errors.phoneNumber = 'Required field';
  } else if (!/^\d+$/.test(values.phoneNumber)) {
    errors.phoneNumber = 'Invalid cell phone number. Example of the correct variant: 29233XXXX';
    errors.phoneCode = 'Invalid cell phone number. Example of the correct variant: 29233XXXX';
  }

  if (!trimmedValues.linkedin) {
    errors.linkedin = 'Required field';
  }
  return errors;
};
