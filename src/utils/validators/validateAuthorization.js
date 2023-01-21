import { emailValidator } from './validators';

export const validateAuthorization = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = 'Required field';
  } else if (!emailValidator(values.email)) {
    errors.email = 'Invalid email';
  }

  if (!values.password) {
    errors.password = 'Required field';
  }

  return errors;
};
