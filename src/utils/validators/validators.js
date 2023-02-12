export const trimValues = (object, replaceToNull = false) => {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (typeof value === 'string') {
      acc[key] = replaceToNull ? value.trim() || null : value.trim();
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});
};

export const emailValidator = (value) => {
  let email = value.trim();
  const EMAIL_REGEXP =
    /^[a-zA-Z0-9]+([!"#$%&'()*+,\-.\/:;<=>?[\]\\^_{}][a-zA-Z0-9]+)*@([a-zA-Z0-9]+(-[a-zA-Z0-9]+)?)(\.[a-z]{2,})+$/u;
  return EMAIL_REGEXP.test(email);
};

export const checkIsValidName = (value) => {
  const REGEXP = /^[a-z]+(([ -])?[a-z]+)*$/i;
  return REGEXP.test(value);
};
