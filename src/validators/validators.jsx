export const required = (value) => {
  if (value) return undefined;
  return 'Required field';
};

export const emailValidator = (value) => {
  let email = value.trim();
  const EMAIL_REGEXP =
    /^[a-zA-Z0-9]+([!"#$%&'()*+,\-.\/:;<=>?[\]\\^_{}][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)?)\.([a-z]{2,})(\.[a-z]{2,})?$/iu;
  if (!EMAIL_REGEXP.test(email)) return 'Invalid email';
  return undefined;
};

const maxLengthCreator = (maxLength, message) => (value) => {
  if (value.length > maxLength) return message;
  return undefined;
};
export const emailLength = maxLengthCreator(50, 'Invalid email');
