export const findPhoneCodeByCountryId = (phoneCodes, countryId) => {
  const foundPhoneCode = phoneCodes.find((phoneCode) => phoneCode.country.id === countryId);
  return foundPhoneCode;
};
