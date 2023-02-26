import { trimValues } from './validators';

export const validateAboutYourself = (values) => {
  const trimmedValues = trimValues(values);
  let errors = {};

  const descriptionPattern = /^[a-zA-Z0-9!-\/:-@[-`{-~ ’“”]+$/;

  if (!values.description) {
    errors.description = 'Required field';
  } else if (!trimmedValues.description) {
    errors.description = 'Invalid data';
  } else if (!descriptionPattern.test(trimmedValues.description)) {
    errors.description = 'Invalid data';
  }

  return errors;
};
